import { createSlice } from "@reduxjs/toolkit";

interface InitialAppStoreState {
  showSidenav: boolean;
  tokenTypeSelected: string;
}

const initialState: InitialAppStoreState = {
  showSidenav: false,
  tokenTypeSelected: "Ether",
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    toggleShowSidenav(state) {
      state.showSidenav = !state.showSidenav;
    },
    changeTokenType(state, { payload }) {
      state.tokenTypeSelected = payload;
    },
  },
});

export const { toggleShowSidenav, changeTokenType } = appSlice.actions;

export default appSlice.reducer;
