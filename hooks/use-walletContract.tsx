import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addMultiSigWalletContract } from "../store/web3/web3.store";

export const useWalletContract = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.web3Reducer);

  const importMultiSigWalletContract = async (address: string) => {
    // const contract = new ethers.Contract(
    //   address,
    //   MultisigWallet.abi,
    //   new ethers.providers.Web3Provider((window as any).ethereum).getSigner()
    // ) as MultiSigWallet & Contract;

    dispatch(addMultiSigWalletContract(address));
  };

  const createTransactionRequest = async (to: string, value: number) => {};

  const getAllUserWallets = () => {
    return selector.contracts;
  };

  return {
    importMultiSigWalletContract,
    createTransactionRequest,
    getAllUserWallets,
  };
};
