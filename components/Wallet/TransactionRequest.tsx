import { FC, useContext } from "react";
import { TransactionRequest } from "../../models/TransactionRequestEther";
import { WalletContext } from "../../state/context/walletContextProvider";
import { formatAddress } from "../../utils/format-address";
import { ethers } from "ethers";
import Button from "../UI/Button";

const TransactionRequest: FC<TransactionRequest> = ({
  approved,
  executed,
  id,
  requester,
  required,
  to,
  value,
}) => {
  const { approveTransactionRequest, executeTransactionRequest, showSpinner } =
    useContext(WalletContext);

  return (
    <>
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
    </>
  );
};

export default TransactionRequest;
