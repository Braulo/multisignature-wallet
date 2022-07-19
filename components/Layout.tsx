import { PropsWithChildren, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Navbar from "./UI/Navbar";
import Sidenav from "./UI/Sidenav";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const showSidenav = useSelector(
    (state: RootState) => state.appReducer.showSidenav
  );
  return (
    <div className="flex flex-col text-black dark:text-white bg-white dark:bg-black h-screen break-all">
      <Navbar />
      {showSidenav && <Sidenav />}
      <main className="grow bg-white dark:bg-black">{children}</main>
    </div>
  );
};

export default Layout;
