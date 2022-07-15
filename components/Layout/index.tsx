import { PropsWithChildren, FC } from "react";
import Navbar from "../UI/Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
