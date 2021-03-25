import { createContext, FC, useEffect, useState } from "react";

interface ActiveNotification {
  title: string;
  message: string;
  status: string;
}

export interface INotificationContext {
  notification: ActiveNotification | null;
  showNotification: (notificationData: ActiveNotification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<INotificationContext>({
  notification: null,
  showNotification: function (notificationData: ActiveNotification) {},
  hideNotification: function () {},
});

export const NotificationContextProvider: FC = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState<
    ActiveNotification | undefined | null
  >();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  function showNotificationHandler(notificationData: ActiveNotification) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context: INotificationContext = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
