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
import { TransactionRequest } from "../../models/TransactionRequestEther";
import { useAdmins } from "../../hooks/useAdmins";

interface IInitialReducerWalletState {
  walletContractsAddresses: string[];
  loading: boolean;
  selectedWallet: Contract & MultiSigWallet;
  selectedWalletBalance: string;
  transactionRequests: TransactionRequest[];
}
const initialState: IInitialReducerWalletState = {
  walletContractsAddresses: [],
  loading: false,
  selectedWallet: {} as Contract & MultiSigWallet,
  selectedWalletBalance: "",
  transactionRequests: [],
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
    case "SET_WALLET_BALANCE":
      return { ...state, selectedWalletBalance: action.payload };
    case "SET_TXREQUESTS":
      return { ...state, transactionRequests: action.payload };
    default:
      return state;
  }
};

const useWallet = () => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const {
    state: { provider },
  } = useContext(Web3Context);

  const { getAllAdminsForWallet } = useAdmins();

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

  const setSelectedWallet = async (address: string) => {
    const walletContract = new ethers.Contract(
      address,
      walletContractArtifact.abi,
      provider.getSigner()
    ) as Contract & MultiSigWallet;

    dispatch({ type: "SET_SELECTEDWALLET", payload: walletContract });

    await getAllTransactions(walletContract);
    await getAllAdminsForWallet(walletContract);
    await getWalletValue(walletContract.address);
  };

  const getWalletValue = async (address: string) => {
    const value = await provider.getBalance(address);

    dispatch({
      type: "SET_WALLET_BALANCE",
      payload: ethers.utils.formatEther(value.toString()),
    });
  };

  const depositEther = async (value: string) => {
    try {
      const tx = await state.selectedWallet.depositToWallet({
        value: ethers.utils.parseEther(value),
      });
      await tx.wait();

      await getWalletValue(state.selectedWallet.address);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTransactions = async (wallet: Contract & MultiSigWallet) => {
    try {
      const transactions = await wallet.getAllTransactions();
      dispatch({ type: "SET_TXREQUESTS", payload: transactions });
    } catch (error) {
      console.log(error);
    }
  };

  const createTransactionRequestEther = async (
    to: string,
    value: string,
    data: []
  ) => {
    const tx = await state.selectedWallet.createTransactionRequest(
      to,
      ethers.utils.parseEther(value),
      data
    );

    await tx.wait();

    await getAllTransactions(state.selectedWallet);
  };

  const createNewWallet = async (admins: string[], required: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const walletContract = new ethers.ContractFactory(
        walletContractArtifact.abi,
        walletContractArtifact.bytecode,
        provider?.getSigner()
      );

      const contract = await walletContract.deploy(admins, required);
      await contract.deployed();
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "ADD_WALLET", payload: contract.address });
      return contract.address;
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      console.log(error);
      return "";
    }
  };

  return {
    createNewWallet,
    createTransactionRequestEther,
    setSelectedWallet,
    importMultiSigWalletContract,
    depositEther,
    getWalletValue,
    state,
  };
};

export const WalletContextProvider: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <WalletContext.Provider value={useWallet()}>
        {props.children}
      </WalletContext.Provider>
    </>
  );
};

export const WalletContext = createContext({} as ReturnType<typeof useWallet>);
