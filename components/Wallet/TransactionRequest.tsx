import { FC, useContext, useEffect, useState } from "react";
import { TransactionRequest } from "../../models/TransactionRequestEther";
import { WalletContext } from "../../state/context/walletContextProvider";
import { formatAddress } from "../../utils/format-address";
import { ethers } from "ethers";
import Button from "../UI/Button";
import { useERC20Wallet } from "../../hooks/useERC20Wallet";
import { isToken } from "../../utils/isToken";

const TransactionRequest: FC<TransactionRequest> = ({
  approved,
  executed,
  id,
  requester,
  required,
  to,
  value,
  erc20Token,
  erc721Token,
}) => {
  const { approveTransactionRequest, executeTransactionRequest } =
    useContext(WalletContext);

  const { getTokenName, tokenName } = useERC20Wallet();

  const [transactionType, setTransactionType] = useState("");

  useEffect(() => {
    if (isToken(erc20Token)) {
      getTokenName(erc20Token);
      setTransactionType("ERC20");
    } else {
      setTransactionType("ETH");
    }
  }, []);

  return (
    <>
      {transactionType === "ERC20" && (
        <>
          <h1 className="text-center text-2xl font-bold">{transactionType}</h1>
          <h1>
            Token: {formatAddress(erc20Token)} ({tokenName})
          </h1>
          <h1>{`Value: ${ethers.utils.formatEther(
            value.toString()
          )} ${tokenName}`}</h1>
        </>
      )}
      {transactionType === "ETH" && (
        <>
          <h1 className="text-center text-2xl font-bold">{transactionType}</h1>
          <h1>{`Value ${ethers.utils.formatEther(value.toString())} ETH`}</h1>
        </>
      )}
      <h1>Requester: {formatAddress(requester)}</h1>
      <h1>To: {formatAddress(to)}</h1>
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