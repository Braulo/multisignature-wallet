import { FC } from "react";
import Link from "next/link";
import ThemeToggle from "../../ThemeToggle";
import ConnectWallet from "../../ConnectWallet";
import { useDispatch } from "react-redux";
import { toggleShowSidenav } from "../../../store/app/app.store";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar: FC = () => {
  const dispatch = useDispatch();

  return (
    <nav
      className={`w-100 dark:bg-black bg-white flex flex-wrap justify-between items-center p-4`}
    >
      <div className="flex justify-center items-center">
        <AiOutlineMenu
          className="text-black dark:text-white cursor-pointer mr-4 w-5 h-5"
          onClick={() => {
            dispatch(toggleShowSidenav());
          }}
        />
        <div className="text-2xl text-black dark:text-white font-bold select-none">
          <Link href="/">Multisig-Wallet</Link>
        </div>
      </div>
      <div className="flex items-stretch justify-center">
        <ConnectWallet />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
