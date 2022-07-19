import { useRouter } from "next/router";
import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";

const MyWallets = () => {
  const {
    state: { walletContractsAddresses },
  } = useContext(WalletContext);
  const router = useRouter();

  const openContractHandler = (address: string) => {
    router.push("/wallet/my/" + address);
  };

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
