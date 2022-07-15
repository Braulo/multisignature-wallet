import Button from "../UI/Button";
import { useWeb3 } from "../../hooks/use-web3";

const ConnectWallet = () => {
  const { connectWallet, selector } = useWeb3();

  return (
    <>
      {selector.isConnected ? (
        <h1 className="text-white">{selector.userAddress}</h1>
      ) : (
        <Button className="mr-4" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
