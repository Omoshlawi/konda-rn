import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";

const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      //   sound: "default",
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      //   description: "Default channel for notifications",
      //   showBadge: true,
      //   bypassDnd: true,
      //   enableLights: true,
    });
  }
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      //   alert("Failed to get push token for push notification!");
      //   return;
      throw new Error(
        "Persmission not granted to get push token for push notification!"
      );
    }
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      throw new Error("Project ID not found in easConfig");
    }
    try {
      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      });
      const pushTokenString = pushToken.data;
      return pushTokenString;
    } catch (error) {
      throw new Error("Error getting Expo push token: " + error);
    }
  } else {
    // alert("Must use physical device for Push Notifications");
    throw new Error("Must use physical device for Push Notifications");
  }
};

export default registerForPushNotificationsAsync;
