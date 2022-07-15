import { FC } from "react";
import Button from "../Button";

const Navbar: FC = () => {
  return (
    <nav className="w-100 bg-blue-400 flex justify-between items-center p-4">
      <h1 className="text-2xl text-white font-bold">Multisig-Wallet</h1>
      <Button onClick={() => console.log("test click")}>Connect Wallet</Button>
    </nav>
  );
};

export default Navbar;
