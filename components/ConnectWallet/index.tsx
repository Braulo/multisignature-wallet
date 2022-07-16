import Button from "../UI/Button";
import { useWeb3 } from "../../hooks/use-web3";
import { useEffect } from "react";

const ConnectWallet = () => {
  const { connectWallet, selector, setProvider } = useWeb3();

  useEffect(() => {
    setProvider();
  }, []);

  return (
    <>
      {selector.isConnected ? (
        <h1 className="dark:text-white text-black self-center mr-4 select-none">
          {selector.userAddress.substring(0, 5)}...
          {selector.userAddress.substring(
            selector.userAddress.length - 4,
            selector.userAddress.length
          )}
        </h1>
      ) : (
        <Button className="mr-4 select-none" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
