import { ReactNode, useContext } from "react";
import NotificationContext from "../../store/NotificationContext";
import Notification from "../ui/Notification";
import MainHeader from "./MainHeader";

export interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  const { notification: activeNotification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </>
  );
}

export default Layout;
