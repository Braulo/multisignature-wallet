import type { NextPage } from "next";
import Button from "../components/UI/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="p-4 flex justify-center items-center">
        <Button className="mr-4">
          <Link href="create">Create</Link>
        </Button>
        <Button>Import</Button>
      </div>
    </>
  );
};

export default Home;
