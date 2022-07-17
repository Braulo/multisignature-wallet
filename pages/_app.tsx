import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../state/store";
import { Web3ContextProvider } from "../state/context/web3ContextProvider";
import { WalletContextProvider } from "../state/context/walletContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Web3ContextProvider>
          <WalletContextProvider>
            <Head>
              <title>Multisig-Wallet</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WalletContextProvider>
        </Web3ContextProvider>
      </Provider>
    </>
  );
}

export default MyApp;
