import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import TokenType from "../../../components/Wallet/TokenType";
import { WalletContext } from "../../../state/context/walletContextProvider";
import { formatAddress } from "../../../utils/format-address";
import TransactionRequests from "../../../components/Wallet/TransactionRequestsAll";
import { ethers } from "ethers";
import { Web3Context } from "../../../state/context/web3ContextProvider";
import AdminList from "../../../components/Wallet/AdminList";
import { useRouteGuard } from "../../../hooks/useRouteGuard";

const Wallet = () => {
  const router = useRouter();
  const address = router.query["address"] as string;

  const { setSelectedWallet } = useContext(WalletContext);

  const {
    state: { provider, userAddress },
  } = useContext(Web3Context);

  const [validWallet, setIsValidWallet] = useState(false);

  useRouteGuard();

  useEffect(() => {
    if (address) {
      const validContract = ethers.utils.isAddress(address);
      setIsValidWallet(validContract);
      if (validContract && Object.keys(provider || {})?.length > 1) {
        setSelectedWallet(address);
      }
    }
  }, [address, provider, userAddress]);

  return validWallet ? (
    <>
      <div className="flex flex-col justify-center items-center mt-5">
        <h1 className="text-2xl">Wallet: {formatAddress(address)}</h1>
        <h1 className="mt-5 mb-2 text-2xl">Select a Token</h1>
        <TokenType />
        <AdminList />
        <TransactionRequests />
      </div>
    </>
  ) : (
    <>{<h1>{address} not a valid wallet address</h1>}</>
  );
};

export default Wallet;
