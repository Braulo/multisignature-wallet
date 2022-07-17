import { useRouter } from "next/router";

const Wallet = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <>
      <h1>Wallet: {address}</h1>
    </>
  );
};

export default Wallet;
