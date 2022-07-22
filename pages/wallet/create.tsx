import { Formik } from "formik";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useContext, useState } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";
import { ethers } from "ethers";
import { useRouteGuard } from "../../hooks/useRouteGuard";

const CreateMultisigWallet = () => {
  const {
    createNewWallet,
    state: { loading },
  } = useContext(WalletContext);

  const [message, setMessage] = useState("");

  useRouteGuard();

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-bold mb-4">
          Create a new multisig wallet
        </h1>
        <Formik
          initialValues={{
            admins: "",
            required: "",
          }}
          validate={({ admins, required }) => {
            const errors = {} as any;
            if (!admins) {
              errors.admins = "Required";
            } else if (!required) {
              errors.required = "Required";
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
                className="text-black h-20 border-2 border-dark-secondary"
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
              <Button type="submit" disabled={!isValid} showSpinner={loading}>
                Create
              </Button>
            </form>
          )}
        </Formik>
        {message != "" && <h1>{message}</h1>}
      </div>
    </>
  );
};

export default CreateMultisigWallet;
