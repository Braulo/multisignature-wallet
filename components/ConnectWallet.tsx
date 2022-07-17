import Button from "./UI/Button";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../state/context/web3ContextProvider";

const ConnectWallet = () => {
  const web3Context = useContext(Web3Context);
  const [userAddressFormatted, setUserAddressFormatted] = useState("");

  useEffect(() => {
    web3Context.automaticWalletConnect().catch();
  }, []);

  useEffect(() => {
    setUserAddressFormatted(
      web3Context.userAddress?.substring(0, 5) +
        "..." +
        web3Context.userAddress?.substring(
          web3Context.userAddress.length - 4,
          web3Context.userAddress.length
        )
    );
  }, [web3Context.userAddress]);

  return (
    <>
      {web3Context.userAddress !== "" ? (
        <h1 className="self-center mr-4">{userAddressFormatted}</h1>
      ) : (
        <Button className="mr-4" onClick={web3Context.connectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
