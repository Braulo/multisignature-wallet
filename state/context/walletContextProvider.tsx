import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Contract, ethers } from "ethers";
import walletContractArtifact from "../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";
import { Web3Context } from "../context/web3ContextProvider";
import { MultiSigWallet } from "../../typechain/MultiSigWallet";

export const WalletContext = createContext({
  walletContractsAddresses: [""],
  loading: false,
  selectedWallet: {} as Contract & MultiSigWallet,
  importMultiSigWalletContract: (address: string) => Promise.resolve(),
  createNewWallet: (admins: string[], required: number) => Promise.resolve(""),
  setSelectedWallet: (address: string) => {},
});

interface IInitialReducerWalletState {
  walletContractsAddresses: string[];
  loading: boolean;
  selectedWallet: Contract & MultiSigWallet;
}
const initialState: IInitialReducerWalletState = {
  walletContractsAddresses: [],
  loading: false,
  selectedWallet: {} as Contract & MultiSigWallet,
};

const walletReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
): IInitialReducerWalletState => {
  switch (action.type) {
    case "ADD_WALLET":
      const newState = {
        ...state,
        walletContractsAddresses: [
          ...state.walletContractsAddresses,
          action.payload,
        ],
      };

      localStorage.setItem(
        "wallets",
        JSON.stringify(newState.walletContractsAddresses)
      );

      return newState;
    case "SET_WALLETS":
      return {
        ...state,
        walletContractsAddresses: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      } as IInitialReducerWalletState;
    case "SET_SELECTEDWALLET":
      return {
        ...state,
        selectedWallet: action.payload,
      };
    default:
      return state;
  }
};

export const WalletContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const web3Context = useContext(Web3Context);

  useEffect(() => {
    const contractString = localStorage.getItem("wallets");

    if (!contractString) {
      return;
    }
    const contracts = JSON.parse(localStorage.getItem("wallets") || "");
    dispatch({ type: "SET_WALLETS", payload: contracts });
  }, []);

  const importMultiSigWalletContract = async (address: string) => {
    dispatch({ type: "ADD_WALLET", payload: address });
  };

  const setSelectedWallet = (address: string) => {
    const walletContract = new ethers.Contract(
      address,
      walletContractArtifact.abi,
      web3Context.provider?.getSigner()
    );

    dispatch({ type: "SET_SELECTEDWALLET", payload: walletContract });
  };

  const createNewWallet = async (admins: string[], required: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const walletContract = new ethers.ContractFactory(
        walletContractArtifact.abi,
        walletContractArtifact.bytecode,
        web3Context.provider?.getSigner()
      );

      const contract = await walletContract.deploy(admins, required);
      await contract.deployed();
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "ADD_WALLET", payload: contract.address });
      return contract.address;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  return (
    <>
      <WalletContext.Provider
        value={{
          walletContractsAddresses: state.walletContractsAddresses,
          loading: state.loading,
          selectedWallet: state.selectedWallet,
          importMultiSigWalletContract,
          createNewWallet,
          setSelectedWallet,
        }}
      >
        {props.children}
      </WalletContext.Provider>
    </>
  );
};