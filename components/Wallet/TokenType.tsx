import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import TokenTypeMenu from "./TokenTypeMenu";
import CreateTransactionRequestEthers from "./Ether/CreateTransactionRequestEthers";
import CreateTransactionRequestERC20 from "./ERC20/CreateTransactionRequestERC20";
import CreateTransactionRequestERC721 from "./ERC721/CreateTransactionRequestERC721";
import DepositEther from "./Ether/DepositEther";
import DepositERC721 from "./ERC721/DepositERC721";
import DepositERC20 from "./ERC20/DepositERC20";

const TokenType = () => {
  const selectedTransactionRequestOption = useSelector(
    (state: RootState) => state.appReducer.tokenTypeSelected
  );

  return (
    <div className="mb-10">
      <TokenTypeMenu />
      {selectedTransactionRequestOption == "Ether" && (
        <>
          <DepositEther />
          <CreateTransactionRequestEthers />
        </>
      )}
      {selectedTransactionRequestOption == "ERC20" && (
        <>
          <CreateTransactionRequestERC20 />
          <DepositERC20 />
        </>
      )}
      {selectedTransactionRequestOption == "ERC721" && (
        <>
          <CreateTransactionRequestERC721 />
          <DepositERC721 />
        </>
      )}
    </div>
  );
};

export default TokenType;
