import { Formik } from "formik";
import { ethers } from "ethers";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useSelectedWallet } from "../../hooks/useSelectedWallet";

const CreateTransactionRequestEthers = () => {
  const { createTransactionRequestEther } = useSelectedWallet();

  return (
    <>
      <Formik
        initialValues={{
          to: "",
          value: "",
        }}
        validate={({ to, value }) => {
          const errors = {} as any;

          if (!to) {
            errors.to = "Required";
          } else if (!ethers.utils.isAddress(to)) {
            errors.to = `Address (${to})ist not valid`;
          } else if (+value < 0) {
            errors.value = "Has to be more than 0";
          }
          return errors;
        }}
        validateOnChange={true}
        onSubmit={async ({ to, value }, { setSubmitting, resetForm }) => {
          const lol = await createTransactionRequestEther(to, value, []);

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
            <Input
              type="text"
              labelName="Send transaction to:"
              name="to"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.to}
              placeholder="0x124.."
            />
            {errors.to && touched.to && errors.to}
            <Input
              type="number"
              name="value"
              labelName="Ether value you want to send"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.value}
              placeholder="0.01"
            />
            {errors.value && touched.value && errors.value}
            <Button type="submit" disabled={!isValid}>
              Request Transaction
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateTransactionRequestEthers;
