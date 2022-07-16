import { PropsWithChildren, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Navbar from "../UI/Navbar";
import Sidenav from "../UI/Sidenav";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const showSidenav = useSelector(
    (state: RootState) => state.appReducer.showSidenav
  );
  return (
    <>
      <Navbar />
      {showSidenav && <Sidenav />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
