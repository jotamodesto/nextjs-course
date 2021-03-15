import { ReactNode } from "react";
import MainHeader from "./MainHeader";

export interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
