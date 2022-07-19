import { Formik } from "formik";
import { useContext } from "react";
import { WalletContext } from "../../../state/context/walletContextProvider";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const DepositEther = () => {
  const { depositEther } = useContext(WalletContext);

  return (
    <>
      <Formik
        initialValues={{
          value: "",
        }}
        validate={({ value }) => {
          const errors = {} as any;

          if (+value < 0) {
            errors.value = "Has to be more than 0";
          }
          return errors;
        }}
        validateOnChange={true}
        onSubmit={async ({ value }, { setSubmitting, resetForm }) => {
          await depositEther(value.toString());

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
              type="number"
              name="value"
              labelName="Ether ammount you want to deposit"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.value}
              placeholder="0.01"
            />
            {errors.value && touched.value && errors.value}
            <Button type="submit" disabled={!isValid}>
              Deposit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DepositEther;
