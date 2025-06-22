import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  PropsWithChildren,
} from "react";
import * as Notifications from "expo-notifications";
import { EventSubscription } from "expo-modules-core";
import registerForPushNotificationsAsync from "./registerForPushNotificationsAsync";
import { useSession } from "../global-store";
import { useAuthAPi } from "@/features/auth/hooks";
import { showSnackbar } from "../overlays";
import { handleApiErrors } from "../api";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
  isLoading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const { isAuthenticated } = useSession();
  const { updatesessionUserPushToken } = useAuthAPi();
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(false);

  const notificationListener = useRef<EventSubscription>(null);
  const responseListener = useRef<EventSubscription>(null);

  useEffect(() => {
    setLoading(true);
    registerForPushNotificationsAsync()
      .then(
        (token) => setExpoPushToken(token),
        (error) => setError(error)
      )
      .finally(() => setLoading(false));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(
          "🔔 Notification Received while the app is running.: ",
          notification
        );
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "🔔 Notification Response whenever a user interacts with a notification (for example, taps on it).: ",
          JSON.stringify(response, null, 2),
          JSON.stringify(response.notification.request.content.data, null, 2)
        );
        // Handle the notification response here
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current?.remove?.();
      }
      if (responseListener.current) {
        responseListener.current?.remove?.();
      }
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && expoPushToken) {
      updatesessionUserPushToken(expoPushToken)
        .then((_) =>
          showSnackbar({
            kind: "success",
            title: "Success",
            subtitle: "Updated push token succesfully",
          })
        )
        .catch((e) => {
          const error = handleApiErrors<{ expoPushToken: string }>(e);
          showSnackbar({
            kind: "error",
            title: "Error",
            subtitle: error?.detail ?? error?.expoPushToken,
          });
        });
    }
  }, [expoPushToken, isAuthenticated, updatesessionUserPushToken]);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error, isLoading }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
