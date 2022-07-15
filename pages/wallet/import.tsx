import { useEffect } from "react";
import Button from "../../components/UI/Button";
import { useWeb3 } from "../../hooks/use-web3";

const ImportMultiSigWallet = () => {
  const { createTransactionRequest, setMultiSigWalletContract } = useWeb3();
  useEffect(() => {
    setMultiSigWalletContract("");
  }, []);
  return (
    <>
      <h1>Import wallet</h1>
      <Button onClick={() => createTransactionRequest()}>Test</Button>
    </>
  );
};

export default ImportMultiSigWallet;
