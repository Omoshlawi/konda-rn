import * as Notifications from "expo-notifications";

// VERY IMPORTANT AS IT SPECIFIES HOW NOTIFICATION IS HANDLED WHEN RECEIVE WHEN THE APP IS IN FOREGROUND
// SHOULD BE IN THE APPS ENTRY POINT AND OUTSIDE ANY COMPONENT
const configureNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

export default configureNotificationHandler;
