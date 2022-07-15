import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Button from "../components/UI/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="p-4">
        <Button className="mr-4">
          <Link href="create">test</Link>
        </Button>
        <Button
          onClick={() => {
            console.log("create wallet");
          }}
        >
          Import Multisig-Wallet
        </Button>
      </div>
    </>
  );
};

export default Home;
