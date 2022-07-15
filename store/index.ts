import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "./web3/web3.store";

const store = configureStore({
  reducer: web3Reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
