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
        {transactionRequests?.map((request) => (
          <li
            key={request.to}
            className="dark:bg-dark-secondary bg-light-secondary m-4 rounded p-4 w-96"
          >
            <h1>Requester: {formatAddress(request.requester)}</h1>
            <h1>To: {formatAddress(request.to)}</h1>
            <h1>
              Value: {ethers.utils.formatEther(request.value.toString())} ETH
            </h1>
            <h1>Executed: {request.executed.toString()}</h1>
            <Button
              onClick={async () => {
                await approveTransactionRequest(request.id.toString());
              }}
            >
              Approve
            </Button>
            {!request.executed && (
              <Button
                onClick={async () => {
                  await executeTransactionRequest(request.id.toString());
                }}
              >
                Execute
              </Button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionRequestsAll;
