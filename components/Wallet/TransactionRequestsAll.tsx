import { useContext } from "react";
import { formatAddress } from "../../utils/format-address";
import { ethers } from "ethers";
import { WalletContext } from "../../state/context/walletContextProvider";
import Button from "../UI/Button";

const TransactionRequestsAll = () => {
  const {
    approveTransactionRequest,
    executeTransactionRequest,
    state: { transactionRequests },
  } = useContext(WalletContext);

  return (
    <>
      <h1 className="text-2xl font-bold">Transactions/ Requests:</h1>
      <ul>
        {transactionRequests?.map(
          ({ to, id, requester, required, approved, value, executed }) => (
            <li
              key={+id}
              className="dark:bg-dark-secondary bg-light-secondary m-4 rounded p-4 w-96"
            >
              <h1>Requester: {formatAddress(requester)}</h1>
              <h1>To: {formatAddress(to)}</h1>
              <h1>Value: {ethers.utils.formatEther(value.toString())} ETH</h1>
              <h1>Executed: {executed.toString()}</h1>
              <h1>Approved: {`${approved} of ${required}`}</h1>
              <div className="flex justify-evenly mt-5">
                {!executed && (
                  <Button
                    onClick={async () => {
                      await approveTransactionRequest(id.toString());
                    }}
                  >
                    Approve
                  </Button>
                )}
                {!executed && approved >= required && (
                  <Button
                    onClick={async () => {
                      await executeTransactionRequest(id.toString());
                    }}
                  >
                    Execute
                  </Button>
                )}
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default TransactionRequestsAll;
