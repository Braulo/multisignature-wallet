import { useContext, useEffect, useReducer, useState } from "react";
import { WalletContext } from "../state/context/walletContextProvider";
import { Web3Context } from "../state/context/web3ContextProvider";
import { ethers } from "ethers";

interface IInitialReducerWalletState {
  admins: string[];
  error: string;
}
const initialState: IInitialReducerWalletState = {
  admins: [],
  error: "",
};

const walletReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
): IInitialReducerWalletState => {
  switch (action.type) {
    case "ADD_ADMINS":
      return { ...state, admins: action.payload };
    case "ADD_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export const useSelectedWallet = (address?: string) => {
  const { setSelectedWallet, selectedWallet, dispatchContext } =
    useContext(WalletContext);
  const [validWallet, setIsValidWallet] = useState(false);
  const { provider, userAddress } = useContext(Web3Context);

  const [state, dispatch] = useReducer(walletReducer, initialState);

  useEffect(() => {
    if (address) {
      const validContract = ethers.utils.isAddress(address);
      setIsValidWallet(validContract);

      if (validContract && provider && provider.getSigner()) {
        setSelectedWallet(address);
      }
    }
  }, [provider]);

  useEffect(() => {
    if (provider && selectedWallet.address) {
      getAllAdminsForSelectedWallet();
      getWalletValue();
    }
  }, [provider, address, selectedWallet.address]);

  const getWalletValue = async () => {
    const value = await provider.getBalance(selectedWallet.address);

    dispatchContext({
      type: "SET_WALLET_BALANCE",
      payload: ethers.utils.formatEther(value.toString()),
    });
  };

  const depositEther = async (value: string) => {
    try {
      const tx = await selectedWallet.depositToWallet({
        value: ethers.utils.parseEther(value),
      });
      await tx.wait();

      await getWalletValue();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAdminsForSelectedWallet = async () => {
    try {
      const admins = await selectedWallet.getAllAdmins();
      dispatch({ type: "ADD_ADMINS", payload: admins });
      dispatch({ type: "ADD_ERROR", payload: "" });

      if (!(await selectedWallet.isAdmin(userAddress))) {
        dispatch({
          type: "ADD_ERROR",
          payload: "You seem to be not an admin for this wallet!",
        });
      }
    } catch (error) {
      dispatch({ type: "ADD_ADMINS", payload: [] });
      dispatch({
        type: "ADD_ERROR",
        payload: "this wallet does not exist",
      });
    }
  };

  const createTransactionRequestEther = async (
    to: string,
    value: string,
    data: []
  ) => {
    const test = await selectedWallet.createTransactionRequest(
      to,
      ethers.utils.parseEther(value),
      data
    );
    console.log("test", test);
  };

  return {
    validWallet,
    selectedWalletState: state,
    createTransactionRequestEther,
    depositEther,
  };
};
