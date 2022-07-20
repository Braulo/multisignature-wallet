import { Formik } from "formik";
import { useEtherWallet } from "../../../hooks/useEtherWallet";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Spinner from "../../UI/Spinner";

const DepositEther = () => {
  const { etherValue, depositEtherToSelectedWallet, showSpinner } =
    useEtherWallet();

  return (
    <>
      <h1 className="text-center mt-5">Value: {etherValue} ETH</h1>
      <Formik
        initialValues={{
          value: "",
        }}
        validate={({ value }) => {
          const errors = {} as any;

          if (!value) {
            errors.value = "Required";
          } else if (+value < 0) {
            errors.value = "Has to be more than 0";
          }
          return errors;
        }}
        validateOnChange={true}
        onSubmit={async ({ value }, { setSubmitting, resetForm }) => {
          await depositEtherToSelectedWallet(value.toString());

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
            <Button type="submit" disabled={!isValid} showSpinner={showSpinner}>
              Deposit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DepositEther;
