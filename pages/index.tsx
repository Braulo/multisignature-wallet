import type { NextPage } from "next";
import Button from "../components/UI/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="p-4 flex justify-center items-center">
        {/* <Link href="/wallet/create"> */}
        <Button className="mr-4">Create</Button>
        {/* </Link> */}
        {/* <Link href="/wallet/import"> */}
        <Button className="mr-4">Import</Button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Home;
