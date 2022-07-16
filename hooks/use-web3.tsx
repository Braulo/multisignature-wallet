import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { updateProvider, updateUserAddress } from "../store/web3/web3.store";
import { RootState } from "../store";

export const useWeb3 = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const setProvider = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
        "any"
      );

      (window as any).ethereum.on("accountsChanged", async () => {
        try {
          dispatch(updateUserAddress(await provider.getSigner().getAddress()));
          dispatch(updateProvider(provider));
        } catch (error) {
          dispatch(updateUserAddress(""));
          dispatch(updateProvider(null));
        }
      });
      (window as any).ethereum.on("chainChanged", async () => {
        dispatch(updateUserAddress(await provider.getSigner().getAddress()));
        dispatch(updateProvider(provider));
      });

      const accounts = await provider.listAccounts();

      if (accounts.length == 0) {
        return null;
      }

      dispatch(updateUserAddress(await provider.getSigner().getAddress()));
      dispatch(updateProvider(provider));

      return provider;
    } catch (error) {
      return null;
    }
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
        dispatch(updateProvider(provider));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please download Metamask");
    }
  };

  return {
    connectWallet,
    selector: selector.web3Reducer,
    setProvider,
  };
};
