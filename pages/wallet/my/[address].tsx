import { useRouter } from "next/router";
import { useSelectedWallet } from "../../../hooks/useSelectedWallet";

const Wallet = () => {
  const router = useRouter();
  const address = router.query["address"] as string;

  const { validWallet, selectedWalletState } = useSelectedWallet(address);

  return validWallet ? (
    <>
      {<h1>{address} valid</h1>}
      {selectedWalletState.admins.map((admin) => (
        <h1 key={admin}>{admin}</h1>
      ))}
      <h1>{selectedWalletState.error}</h1>
    </>
  ) : (
    <>{<h1>{address} not a valid wallet address</h1>}</>
  );
};

export default Wallet;
