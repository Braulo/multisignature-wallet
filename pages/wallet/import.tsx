import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";
import { Formik } from "formik";
import { ethers } from "ethers";

const ImportMultiSigWallet = () => {
  const walletContext = useContext(WalletContext);

  return (
    <>
      <div className="mt-10 flex flex-col justify-center items-center">
        <Formik
          initialValues={{ address: "" }}
          validate={({ address }) => {
            const errors = {} as any;
            if (!address) {
              errors.address = "Required";
            } else if (!ethers.utils.isAddress(address)) {
              errors.address = "Not a valid address";
            }
            return errors;
          }}
          validateOnChange={false}
          onSubmit={(
            { address },

            { setSubmitting, resetForm }
          ) => {
            walletContext.importMultiSigWalletContract(address);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                name="address"
                labelName="Contract Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                placeholder="0x123"
              />
              {errors.address && touched.address && errors.address}
              <Button type="submit" disabled={!isValid}>
                Import
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ImportMultiSigWallet;
