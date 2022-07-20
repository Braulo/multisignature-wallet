import { createContext, FC, PropsWithChildren } from "react";
import { useWallet } from "../../hooks/useWallet";

export const WalletContextProvider: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <WalletContext.Provider value={useWallet()}>
        {props.children}
      </WalletContext.Provider>
    </>
  );
};

export const WalletContext = createContext({} as ReturnType<typeof useWallet>);
