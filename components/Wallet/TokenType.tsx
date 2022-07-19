import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import TokenTypeMenu from "./TokenTypeMenu";
import CreateTransactionRequestEthers from "./Ether/CreateTransactionRequestEthers";
import CreateTransactionRequestERC20 from "./ERC20/CreateTransactionRequestERC20";
import CreateTransactionRequestERC721 from "./ERC721/CreateTransactionRequestERC721";
import DepositEther from "./Ether/DepositEther";
import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";

const TokenType = () => {
  const selectedTransactionRequestOption = useSelector(
    (state: RootState) => state.appReducer.tokenTypeSelected
  );

  const {
    state: { selectedWalletBalance },
  } = useContext(WalletContext);

  return (
    <div className="mb-10">
      <TokenTypeMenu />
      {selectedTransactionRequestOption == "Ether" && (
        <>
          <h1 className="mt-5">Balance: {selectedWalletBalance} ETH</h1>
          <DepositEther />
          <CreateTransactionRequestEthers />
        </>
      )}
      {selectedTransactionRequestOption == "ERC20" && (
        <CreateTransactionRequestERC20 />
      )}
      {selectedTransactionRequestOption == "ERC721" && (
        <CreateTransactionRequestERC721 />
      )}
    </div>
  );
};

export default TokenType;
