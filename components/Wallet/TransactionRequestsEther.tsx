import { useContext, useEffect } from "react";
import { useSelectedWallet } from "../../hooks/useSelectedWallet";
import { formatAddress } from "../../utils/format-address";
import { ethers } from "ethers";
import { WalletContext } from "../../state/context/walletContextProvider";
import Button from "../UI/Button";

const TransactionRequestsEther = () => {
  const { getAllTransactions } = useSelectedWallet();
  const { transactionRequests } = useContext(WalletContext);

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <>
      <h1>Requests:</h1>
      <ul>
        {transactionRequests?.map((request) => (
          <li
            key={request.to}
            className="dark:bg-dark-secondary bg-light-secondary m-4 rounded p-4"
          >
            <h1>Requester: {formatAddress(request.requester)}</h1>
            <h1>To: {formatAddress(request.to)}</h1>
            <h1>
              Value: {ethers.utils.formatEther(request.value.toString())} ETH
            </h1>
            <h1>Executed: {request.executed.toString()}</h1>
            {!request.executed && <Button>Approve</Button>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionRequestsEther;
