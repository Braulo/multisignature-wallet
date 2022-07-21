import { ethers } from "ethers";
import { useContext, useState } from "react";
import { WalletContext } from "../state/context/walletContextProvider";
import { Web3Context } from "../state/context/web3ContextProvider";

const ERC20ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function approve(address spender, uint256 amount) public returns (bool)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export const useERC20Wallet = () => {
  const {
    state: { selectedWallet },
  } = useContext(WalletContext);

  const {
    state: { provider },
  } = useContext(Web3Context);

  const [showSpinner, setShowSpinner] = useState(false);
  const [tokenValue, setTokenValue] = useState("");
  const [tokenName, setTokenName] = useState("");

  const depositERC20ToSelectedWallet = async (
    tokenAddress: string,
    value: string
  ) => {
    try {
      setShowSpinner(true);

      const tokenContract = getTokenContract(tokenAddress);

      const tx1 = await tokenContract.approve(selectedWallet.address, value);
      await tx1.wait();

      const tx2 = await selectedWallet.depositERC20ToWallet(
        tokenAddress,
        value
      );
      await tx2.wait();

      await getWalletValueERC20(tokenAddress);
    } catch (error) {
      console.log(error);
    } finally {
      setShowSpinner(false);
    }
  };

  const getWalletValueERC20 = async (tokenAddress: string) => {
    try {
      const tokenContract = getTokenContract(tokenAddress);

      const value = await tokenContract.balanceOf(selectedWallet.address);

      setTokenValue(value.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenName = async (tokenAddress: string) => {
    try {
      const tokenContract = getTokenContract(tokenAddress);
      const name = await tokenContract.symbol();
      setTokenName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenContract = (tokenAddress: string) => {
    return new ethers.Contract(tokenAddress, ERC20ABI, provider.getSigner());
  };

  return {
    depositERC20ToSelectedWallet,
    getWalletValueERC20,
    showSpinner,
    tokenName,
    tokenValue,
    getTokenName,
  };
};
