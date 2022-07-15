import { useSelector, useDispatch } from "react-redux";
import { Contract, ethers } from "ethers";
import {
  updateUserAddress,
  updateMultiSigWalletContract,
} from "../store/web3/web3.store";
import { RootState } from "../store";
import MultisigWallet from "../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";
import { MultiSigWallet } from "../typechain/MultiSigWallet";

export const useWeb3 = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const setMultiSigWalletContract = async (address: string) => {
    const contract = new ethers.Contract(
      "0xC2c8809CC17aE602495e1bE04847fFCB142dA9d2",
      MultisigWallet.abi,
      new ethers.providers.Web3Provider((window as any).ethereum).getSigner()
    ) as MultiSigWallet & Contract;

    dispatch(updateMultiSigWalletContract(contract));

    // console.log(await contract.getAllAdmins());
  };

  const createTransactionRequest = async () => {
    console.log("test");

    const contract = selector.contract;
    await contract?.createTransactionRequest(
      "0xC2c8809CC17aE602495e1bE04847fFCB142dA9d2",
      10,
      [0]
    );
  };

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum,
          "any"
        );

        await provider.send("eth_requestAccounts", []);

        dispatch(updateUserAddress(await provider.getSigner().getAddress()));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please download Metamask");
    }
  };

  return {
    connectWallet,
    selector,
    setMultiSigWalletContract,
    createTransactionRequest,
  };
};
