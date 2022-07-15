import { createSlice } from "@reduxjs/toolkit";

const web3Slice = createSlice({
  name: "web3",
  initialState: { userAddress: "", isConnected: false },
  reducers: {
    updateUserAddress(state, { payload }) {
      state.userAddress = payload;
      state.isConnected = true;
    },
  },
});

export const { updateUserAddress } = web3Slice.actions;

export default web3Slice.reducer;
