import { ethers } from "ethers";
import { createContext, FC, PropsWithChildren, useReducer } from "react";

interface IInitialReducerWeb3State {
  provider: ethers.providers.Web3Provider;
  userAddress: string;
}

const initialState: IInitialReducerWeb3State = {
  provider: {} as ethers.providers.Web3Provider,
  userAddress: "",
};

export const Web3Context = createContext({
  provider: {} as ethers.providers.Web3Provider,
  connectWallet: () => {},
  userAddress: "",
  automaticWalletConnect: () => Promise.resolve(),
});

const web3Reducer = (
  state = initialState,
  action: { type: string; payload: any }
): IInitialReducerWeb3State => {
  switch (action.type) {
    case "SET_PROVIDER":
      return {
        ...state,
        provider: action.payload.provider,
        userAddress: action.payload.userAddress,
      };
    default:
      return state;
  }
};

const getProvider = () => {
  return new ethers.providers.Web3Provider((window as any).ethereum, "any");
};

export const Web3ContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(web3Reducer, initialState);

  const setUser = (
    provider?: ethers.providers.Web3Provider,
    userAddress?: string
  ) => {
    dispatch({
      type: "SET_PROVIDER",
      payload: {
        provider,
        userAddress,
      },
    });
  };

  const registerProviderEvents = () => {
    (window as any).ethereum.on("accountsChanged", async () => {
      try {
        setUser(getProvider(), await getProvider().getSigner().getAddress());
      } catch (error) {
        setUser(undefined, "");
      }
    });
    (window as any).ethereum.on("chainChanged", async () => {
      setUser(getProvider(), await getProvider().getSigner().getAddress());
    });
  };

  const automaticWalletConnect = async () => {
    const provider = getProvider();

    const accounts = await provider.listAccounts();

    if (accounts.length != 0) {
      registerProviderEvents();
      setUser(provider, await provider.getSigner().getAddress());
    }
  };

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const provider = getProvider();
        await provider.send("eth_requestAccounts", []);
        registerProviderEvents();
        setUser(provider, await provider.getSigner().getAddress());
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please download Metamask");
    }
  };

  return (
    <>
      <Web3Context.Provider
        value={{
          provider: state.provider,
          connectWallet,
          userAddress: state.userAddress,
          automaticWalletConnect,
        }}
      >
        {props.children}
      </Web3Context.Provider>
    </>
  );
};
