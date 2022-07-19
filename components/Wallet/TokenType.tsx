import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import TokenTypeMenu from "./TokenTypeMenu";
import CreateTransactionRequestEthers from "./CreateTransactionRequestEthers";
import CreateTransactionRequestERC20 from "./CreateTransactionRequestERC20";
import CreateTransactionRequestERC721 from "./CreateTransactionRequestERC721";
import Deposit from "./Deposit";
import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";

const TokenType = () => {
  const selectedTransactionRequestOption = useSelector(
    (state: RootState) => state.appReducer.tokenTypeSelected
  );

  const { selectedWalletBalance } = useContext(WalletContext);

  return (
    <>
      <TokenTypeMenu />
      {selectedTransactionRequestOption == "Ether" && (
        <>
          <h1>Blance: {selectedWalletBalance} ETH</h1>
          <Deposit />
          <CreateTransactionRequestEthers />
        </>
      )}
      {selectedTransactionRequestOption == "ERC20" && (
        <CreateTransactionRequestERC20 />
      )}
      {selectedTransactionRequestOption == "ERC721" && (
        <CreateTransactionRequestERC721 />
      )}
    </>
  );
};

export default TokenType;
