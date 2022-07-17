import { createSlice } from "@reduxjs/toolkit";

interface InitialAppStoreState {
  showSidenav: boolean;
}

const initialState: InitialAppStoreState = {
  showSidenav: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    toggleShowSidenav(state) {
      state.showSidenav = !state.showSidenav;
    },
  },
});

export const { toggleShowSidenav } = appSlice.actions;

export default appSlice.reducer;
