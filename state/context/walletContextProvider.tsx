import { createContext, FC, PropsWithChildren, useReducer } from "react";

export const WalletContext = createContext<{
  walletContractsAddresses: string[];
  importMultiSigWalletContract: (address: string) => Promise<void>;
}>({
  walletContractsAddresses: [],
  importMultiSigWalletContract: () => Promise.resolve(),
});

const walletReducer = (
  state = { walletContractsAddresses: [""] },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "ADD_WALLET":
      return {
        ...state,
        walletContractsAddresses: [
          ...state.walletContractsAddresses,
          action.payload,
        ],
      };
    default:
      break;
  }
};

export const WalletContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(walletReducer, {
    walletContractsAddresses: [],
  });

  const importMultiSigWalletContract = async (address: string) => {
    // const contract = new ethers.Contract(
    //   address,
    //   MultisigWallet.abi,
    //   new ethers.providers.Web3Provider((window as any).ethereum).getSigner()
    // ) as MultiSigWallet & Contract;
    dispatch({ type: "ADD_WALLET", payload: address });
  };

  const createTransactionRequest = async (to: string, value: number) => {};

  return (
    <>
      <WalletContext.Provider
        value={{
          walletContractsAddresses: state?.walletContractsAddresses || [],
          importMultiSigWalletContract,
        }}
      >
        {props.children}
      </WalletContext.Provider>
    </>
  );
};
