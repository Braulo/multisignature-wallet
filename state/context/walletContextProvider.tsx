import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ethers } from "ethers";
import walletContractArtifact from "../../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";
import { Web3Context } from "../context/web3ContextProvider";

export const WalletContext = createContext<{
  walletContractsAddresses: string[];
  importMultiSigWalletContract: (address: string) => Promise<void>;
  createNewWallet: (admins: string[], required: number) => Promise<string>;
  loading: boolean;
}>({
  walletContractsAddresses: [],
  importMultiSigWalletContract: () => Promise.resolve(),
  createNewWallet: (admins, required) => Promise.resolve(""),
  loading: false,
});

const walletReducer = (
  state = { walletContractsAddresses: [""], loading: false },
  action: { type: string; payload: any }
) => {
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
      };
    default:
      break;
  }
};

export const WalletContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(walletReducer, {
    walletContractsAddresses: [],
    loading: false,
  });

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

  const createNewWallet = async (admins: string[], required: number) => {
    try {
      console.log("create test");
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
          walletContractsAddresses: state?.walletContractsAddresses || [],
          importMultiSigWalletContract,
          createNewWallet,
          loading: state?.loading || false,
        }}
      >
        {props.children}
      </WalletContext.Provider>
    </>
  );
};
