import { FC, Fragment } from "react";

import MainNavigation from "./main-navigation";

const Layout: FC = props => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
