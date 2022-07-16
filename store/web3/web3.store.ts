import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

interface InitialWeb3StoreState {
  userAddress: string;
  provider?: ethers.providers.Web3Provider;
  isConnected: boolean;
  contracts: string[];
}

const initialState: InitialWeb3StoreState = {
  userAddress: "",
  provider: undefined,
  isConnected: false,
  contracts: [],
};

const web3Slice = createSlice({
  name: "web3",
  initialState: initialState,
  reducers: {
    updateUserAddress(state, { payload }) {
      state.userAddress = payload;
    },
    updateProvider(state, { payload }) {
      state.provider = payload;
      state.isConnected = false;

      if (payload) {
        state.isConnected = true;
      }
    },
    addMultiSigWalletContract(state, { payload }) {
      if (state.contracts) {
        state.contracts = [...state.contracts, payload];
      }
    },
  },
});

export const { updateUserAddress, updateProvider, addMultiSigWalletContract } =
  web3Slice.actions;

export default web3Slice.reducer;
