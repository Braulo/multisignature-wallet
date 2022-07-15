import { createSlice } from "@reduxjs/toolkit";
import { Contract } from "ethers";
import { MultiSigWalletInterface } from "../../typechain/MultiSigWallet";

interface InitialWeb3StoreState {
  userAddress: string;
  isConnected: boolean;
  contract?: Contract & MultiSigWalletInterface;
}

const initialState: InitialWeb3StoreState = {
  userAddress: "",
  isConnected: false,
  contract: undefined,
};

const web3Slice = createSlice({
  name: "web3",
  initialState: initialState,
  reducers: {
    updateUserAddress(state, { payload }) {
      state.userAddress = payload;
      state.isConnected = true;
    },
    updateMultiSigWalletContract(state, { payload }) {
      state.contract = payload;
    },
  },
});

export const { updateUserAddress, updateMultiSigWalletContract } =
  web3Slice.actions;

export default web3Slice.reducer;
