import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";

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
      const newState = {
        ...state,
        walletContractsAddresses: [
          ...state.walletContractsAddresses,
          action.payload,
        ],
      };

      localStorage.setItem(
        "wallets",
        JSON.stringify(newState.walletContractsAddresses)
      );

      return newState;
    case "SET_WALLETS":
      return {
        ...state,
        walletContractsAddresses: action.payload,
      };
    default:
      break;
  }
};

export const WalletContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(walletReducer, {
    walletContractsAddresses: [],
  });

  useEffect(() => {
    const contractString = localStorage.getItem("wallets");

    if (!contractString) {
      return;
    }
    const contracts = JSON.parse(localStorage.getItem("wallets") || "");
    dispatch({ type: "SET_WALLETS", payload: contracts });
  }, []);

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
