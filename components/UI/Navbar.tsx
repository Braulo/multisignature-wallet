import { FC, useContext, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "../UI/ThemeToggle";
import ConnectWallet from "../ConnectWallet";
import { useDispatch } from "react-redux";
import { toggleShowSidenav } from "../../state/store/app/app.store";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar: FC = () => {
  const dispatch = useDispatch();

  return (
    <nav
      className={`w-100 dark:bg-dark-secondary bg-light-secondary flex flex-wrap justify-center md:justify-between items-center p-4`}
    >
      <div className="flex justify-center items-center">
        <button>
          <AiOutlineMenu
            className="text-black dark:text-white cursor-pointer mr-4 w-5 h-5"
            onClick={() => {
              dispatch(toggleShowSidenav());
            }}
          />
        </button>
        <div className="text-2xl font-bold">
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
