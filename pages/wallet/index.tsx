import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useRouteGuard } from "../../hooks/useRouteGuard";
import { WalletContext } from "../../state/context/walletContextProvider";
import { Web3Context } from "../../state/context/web3ContextProvider";

const MyWallets = () => {
  const {
    state: { walletContractsAddresses },
  } = useContext(WalletContext);

  const router = useRouter();

  const openContractHandler = (address: string) => {
    router.push("/wallet/my/" + address);
  };

  useRouteGuard();

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-bold">My Wallets</h1>
        <ul>
          {walletContractsAddresses?.map((contract) => {
            return (
              <li
                className="dark:bg-dark-secondary bg-light-secondary m-4 rounded p-4 cursor-pointer"
                key={contract}
                onClick={() => openContractHandler(contract)}
              >
                <button>{contract}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MyWallets;
