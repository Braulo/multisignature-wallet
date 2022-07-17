import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";
import { Formik } from "formik";

const ImportMultiSigWallet = () => {
  const walletContext = useContext(WalletContext);

  return (
    <>
      <div className="mt-10 flex flex-col justify-center items-center">
        <Formik
          initialValues={{ address: "" }}
          validate={(values) => {
            const errors = {} as any;
            if (!values.address) {
              errors.address = "Required";
            }
            return errors;
          }}
          onSubmit={({ address }, { resetForm }) => {
            walletContext.importMultiSigWalletContract(address);
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
              <Button type="submit">Import</Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ImportMultiSigWallet;
