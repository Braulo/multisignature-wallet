import { FC } from "react";
import Button from "../Button";
import Link from "next/link";
import ThemeToggle from "../../ThemeToggle";

const Navbar: FC = () => {
  return (
    <nav
      className={`w-100 dark:bg-black bg-white flex flex-wrap justify-between items-center p-4`}
    >
      <div className="text-2xl text-black dark:text-white font-bold">
        <Link href="/">Multisig-Wallet</Link>
      </div>
      <div className="flex items-stretch">
        <Button className="mr-4">Connect Wallet</Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
