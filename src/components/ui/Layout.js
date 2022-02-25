import { Fragment } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main className="mx-auto my-5">
        {children}
      </main>
    </Fragment>
  );
};

export default Layout;
