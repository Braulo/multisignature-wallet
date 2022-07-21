import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useERC20Wallet } from "../../../hooks/useERC20Wallet";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { ethers } from "ethers";

const DepositERC20 = () => {
  const {
    getWalletValueERC20,
    depositERC20ToSelectedWallet,
    showSpinner,
    getTokenName,
    tokenName,
    tokenValue,
  } = useERC20Wallet();

  useEffect(() => {
    // console.log("test effect");
    // getWalletValueERC20("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          tokenAddress: "",
          value: "",
        }}
        validate={async ({ tokenAddress, value }) => {
          const errors = {} as any;

          if (!tokenAddress) {
            errors.tokenAddress = "Required";
          } else if (!ethers.utils.isAddress(tokenAddress)) {
            errors.tokenAddress = "Not a valid contract";
          } else if (!value) {
            errors.value = "Required";
          } else if (+value < 0) {
            errors.value = "Has to be more than 0";
          }

          await getTokenName(tokenAddress);
          await getWalletValueERC20(tokenAddress);
          return errors;
        }}
        onSubmit={async (
          { tokenAddress, value },
          { setSubmitting, resetForm }
        ) => {
          await depositERC20ToSelectedWallet(tokenAddress, value.toString());

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
            <Input
              type="text"
              name="tokenAddress"
              labelName="Token Address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tokenAddress}
              placeholder="0x123"
            />
            {errors.tokenAddress && touched.tokenAddress && errors.tokenAddress}
            <Input
              type="number"
              name="value"
              labelName="Token ammount you want to deposit"
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
      {tokenName && (
        <h1 className="text-center">
          Value for {tokenName} = {tokenValue}
        </h1>
      )}
    </>
  );
};

export default DepositERC20;
