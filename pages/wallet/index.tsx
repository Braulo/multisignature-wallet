import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";

const MyWallets = () => {
  const walletContext = useContext(WalletContext);

  return (
    <>
      <h1>My Wallets</h1>
      <ul>
        {walletContext.walletContractsAddresses?.map((contract) => {
          return <li key={contract}>{contract}</li>;
        })}
      </ul>
    </>
  );
};

export default MyWallets;
