import { useContext, useEffect } from "react";
import { useAdmins } from "../../hooks/useAdmins";
import { WalletContext } from "../../state/context/walletContextProvider";
import { Web3Context } from "../../state/context/web3ContextProvider";

const AdminList = () => {
  const { stateAdmins, getAllAdminsForWallet } = useAdmins();
  const { state } = useContext(WalletContext);
  const { userAddress, provider } = useContext(Web3Context);

  useEffect(() => {
    if (state.selectedWallet.address) {
      getAllAdminsForWallet(state.selectedWallet);
    }
  }, [state.selectedWallet.address, userAddress, provider]);

  return (
    <>
      <h1 className="mt-5">{stateAdmins.error}</h1>
      <h1 className="text-2xl font-bold">Admins</h1>
      <ul>
        {stateAdmins.admins.map((admin) => (
          <li
            key={admin}
            className="dark:bg-dark-secondary bg-light-secondary m-4 rounded p-4"
          >
            <h1>{admin}</h1>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminList;
