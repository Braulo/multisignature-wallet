import Button from "../UI/Button";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../../state/context/web3ContextProvider";
import { formatAddress } from "../../utils/format-address";

const ConnectWallet = () => {
  const {
    state: { userAddress },
    connectWallet,
    automaticWalletConnect,
  } = useContext(Web3Context);
  const [userAddressFormatted, setUserAddressFormatted] = useState("");

  useEffect(() => {
    automaticWalletConnect();
  }, []);

  useEffect(() => {
    setUserAddressFormatted(formatAddress(userAddress));
  }, [userAddress]);

  return (
    <>
      {userAddress !== "" ? (
        <h1 className="self-center mr-4">{userAddressFormatted}</h1>
      ) : (
        <Button className="mr-4" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
