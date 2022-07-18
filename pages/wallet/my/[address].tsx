import { useRouter } from "next/router";
import { useSelectedWallet } from "../../../hooks/useSelectedWallet";
import { formatAddress } from "../../../utils/format-address";

const Wallet = () => {
  const router = useRouter();
  const address = router.query["address"] as string;

  const { validWallet, selectedWalletState } = useSelectedWallet(address);

  return validWallet ? (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl">Wallet: {formatAddress(address)}</h1>
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
        <h1>{selectedWalletState.error}</h1>
      </div>
      <h1>Add admin</h1>
    </>
  ) : (
    <>{<h1>{address} not a valid wallet address</h1>}</>
  );
};

export default Wallet;
