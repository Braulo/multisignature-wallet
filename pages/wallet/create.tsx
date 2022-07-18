import { Formik } from "formik";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useContext, useState } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";
import { ethers } from "ethers";

const CreateMultisigWallet = () => {
  const { createNewWallet, loading } = useContext(WalletContext);
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-bold mb-4">
          Create a new multisig wallet
        </h1>
        <Formik
          initialValues={{
            admins:
              "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;0x70997970C51812dc3A010C7d01b50e0d17dc79C8;0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            required: "",
          }}
          validate={({ admins, required }) => {
            const errors = {} as any;
            if (!admins) {
              errors.admins = "Required";
            } else if (+required < 0) {
              errors.required = "Required must be greater than 0";
            }

            admins.split(";").forEach((address) => {
              if (!ethers.utils.isAddress(address)) {
                errors.admins = `Address (${address})ist not valid`;
              }
            });
            return errors;
          }}
          validateOnChange={false}
          onSubmit={async (
            { admins, required },
            { setSubmitting, resetForm }
          ) => {
            const adminsList = admins.split(";");

            const address = await createNewWallet(adminsList, +required);
            setMessage(
              address
                ? `Contract deployed to ${address}`
                : "Something went wrong"
            );

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
              <textarea
                className="text-black h-20"
                name="admins"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.admins}
                placeholder="0x123;0x312;0xfff"
              />
              {errors.admins && touched.admins && errors.admins}
              <Input
                type="number"
                name="required"
                labelName="Admins required to approve a transaction"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.required}
                placeholder="2"
              />
              {errors.required && touched.required && errors.required}
              <Button type="submit" disabled={!isValid}>
                Create
              </Button>
            </form>
          )}
        </Formik>
        {loading && <h1>Loading...</h1>}
        {message != "" && <h1>{message}</h1>}
      </div>
    </>
  );
};

export default CreateMultisigWallet;
