import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";
import TransactionRequest from "./TransactionRequest";
import Spinner from "../UI/Spinner";

const TransactionRequestsAll = () => {
  const {
    showSpinner,
    state: { transactionRequests },
  } = useContext(WalletContext);

  return (
    <>
      <h1 className="text-2xl font-bold">Transactions/ Requests</h1>
      {showSpinner && <Spinner />}
      <ul>
        {transactionRequests?.map((transaction) => (
          <li
            key={+transaction.id}
            className="dark:bg-dark-secondary bg-light-secondary m-4 rounded p-4 w-96"
          >
            <TransactionRequest {...transaction} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionRequestsAll;
