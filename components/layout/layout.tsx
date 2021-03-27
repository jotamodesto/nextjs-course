import { FC } from "react";
import MainNavigation from "./main-navigation";

const Layout: FC = props => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
