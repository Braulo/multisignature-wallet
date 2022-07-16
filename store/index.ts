import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "./web3/web3.store";
import appReducer from "./app/app.store";

const store = configureStore({
  reducer: { web3Reducer, appReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
