import { useRouter } from "next/router";
import { useContext } from "react";
import TokenType from "../../../components/Wallet/TokenType";
import { useSelectedWallet } from "../../../hooks/useSelectedWallet";
import { WalletContext } from "../../../state/context/walletContextProvider";
import { formatAddress } from "../../../utils/format-address";
import TransactionRequests from "../../../components/Wallet/TransactionRequestsEther";

const Wallet = () => {
  const router = useRouter();
  const address = router.query["address"] as string;

  const { validWallet, selectedWalletState } = useSelectedWallet(address);
  const { selectedWalletBalance } = useContext(WalletContext);

  return validWallet ? (
    <>
      <div className="flex flex-col justify-center items-center mt-5">
        <h1 className="text-2xl">
          Wallet: {formatAddress(address)} {selectedWalletBalance} ETH
        </h1>

        <h1 className="mt-5 mb-2 text-2xl">Select a Token</h1>
        <TokenType />
        <h1>{selectedWalletState.error}</h1>
        <h1>Admins for this wallet:</h1>
        <ul>
          {selectedWalletState.admins.map((admin) => (
            <li
              key={admin}
              className="dark:bg-dark-secondary bg-light-secondary m-4 rounded p-4"
            >
              <h1>{admin}</h1>
            </li>
          ))}
        </ul>
        <h1>All Transaction requests:</h1>
        <TransactionRequests />
      </div>
    </>
  ) : (
    <>{<h1>{address} not a valid wallet address</h1>}</>
  );
};

export default Wallet;
