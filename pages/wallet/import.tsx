import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { useContext, useState } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";

const ImportMultiSigWallet = () => {
  const [address, setAddress] = useState("");
  const walletContext = useContext(WalletContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    walletContext.importMultiSigWalletContract(address);
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
