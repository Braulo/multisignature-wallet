import { Formik } from "formik";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useContext } from "react";
import { WalletContext } from "../../state/context/walletContextProvider";

const CreateMultisigWallet = () => {
  const walletContext = useContext(WalletContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-bold mb-4">
          Create a new multisig wallet
        </h1>
        <Formik
          initialValues={{ admins: "", required: "" }}
          validate={(values) => {
            const errors = {} as any;
            if (!values.admins) {
              errors.admins = "Required";
            }
            return errors;
          }}
          onSubmit={({ admins, required }, { setSubmitting, resetForm }) => {
            const adminsList = admins.split(";");
            console.log(adminsList, required);

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
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                name="admins"
                labelName="Admins (seperated by ';')"
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
              <Button type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateMultisigWallet;
