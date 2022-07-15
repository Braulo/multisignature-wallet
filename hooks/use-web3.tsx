import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { updateUserAddress } from "../store/web3/web3.store";
import { RootState } from "../store";

export const useWeb3 = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

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
  };
};