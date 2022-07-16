import Button from "../../components/UI/Button";
import { useWalletContract } from "../../hooks/use-walletContract";
import Input from "../../components/UI/Input";
import { useState } from "react";

const ImportMultiSigWallet = () => {
  const [address, setAddress] = useState("");

  const { importMultiSigWalletContract } = useWalletContract();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    importMultiSigWalletContract(address);
    setAddress("");
  };

  const onChangeHandler = (event) => {
    setAddress(event.target.value);
  };

  return (
    <>
      <div className="m-auto w-1/2">
        <form onSubmit={onSubmitHandler}>
          <Input
            name="Wallet Address"
            placeholder="0x21"
            onChange={onChangeHandler}
            value={address}
          />
          <Button>Import</Button>
        </form>
      </div>
    </>
  );
};

export default ImportMultiSigWallet;
