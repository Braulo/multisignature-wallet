import type { NextPage } from "next";
import ConnectWallet from "../components/Wallet/ConnectWallet";

const Home: NextPage = () => {
  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center">
        <h1>
          Create, import and use Multisig wallets for ERC20, ERC721 and Ether
          transactions
        </h1>
        <h1>Find more information here:</h1>
        <a href="https://github.com/Braulo/multisignature-wallet">GitHub</a>
        <h1 className="font-bold mt-5">Connect now and get started:</h1>
        <ConnectWallet />
      </div>
    </>
  );
};

export default Home;
