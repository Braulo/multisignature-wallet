import { useWalletContract } from "../../hooks/use-walletContract";

const MyWallets = () => {
  const { getAllUserWallets } = useWalletContract();

  return (
    <>
      <h1>My Wallets</h1>
      <ul>
        {getAllUserWallets().map((contract) => {
          return <li key={contract}>{contract}</li>;
        })}
      </ul>
    </>
  );
};

export default MyWallets;
