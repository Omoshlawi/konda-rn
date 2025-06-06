import { Linking, Platform, Pressable, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import {
  ExpansionTile,
  ExpoIconComponent,
  ListTile,
  SectionCard,
  Text,
} from "@/components";
import Constants from "expo-constants";
import { showSnackbar } from "@/lib/overlays";

const NotificationSection = () => {
  const handlePressed = useCallback(async () => {
    if (Platform.OS === "android") {
      try {
        // Linking.openSettings(); // Opens app-specific settings
        const pkg = Constants.expoConfig?.android?.package || "";
        if (Platform.Version >= 26) {
          // Android 8.0+
          await startActivityAsync(ActivityAction.APP_NOTIFICATION_SETTINGS, {
            extra: {
              "android.provider.extra.APP_PACKAGE": pkg || "",
              // "android.provider.extra.CHANNEL_ID": "default",
            },
          });
        } else {
          await startActivityAsync(
            ActivityAction.APPLICATION_DETAILS_SETTINGS,
            { data: "package:" + pkg }
          );
        }
      } catch (error: any) {
        showSnackbar({
          kind: "error",
          title: "Error opening notification settings",
          subtitle: error?.message,
        });
      }
    } else {
      // For iOS, there's no direct way to open notification sound settings
      // Linking.openURL("app-settings:");
      showSnackbar({
        kind: "warning",
        title: "Unavailable",
        subtitle: "This feature is currently not supported on iOS.",
      });
    }
  }, []);
  return (
    <SectionCard title="Notifications">
      <ExpansionTile
        title={"Notification settings"}
        subtitle={"default"}
        leading={
          <ExpoIconComponent family="MaterialCommunityIcons" name="bell" />
        }
        defaultExpanded
        containerStyles={{
          backgroundColor: "transparent",
          margin: 0,
          padding: 0,
        }}
        childContainerStyles={{
          backgroundColor: "transparent",
          padding: 0,
        }}
      >
        <Pressable onPress={handlePressed}>
          <Text>
            1. Tap to open your app notification settings{"\n"}
            2. Tap "Advanced settings"{"\n"}
            3. Choose "Sound" and select your preferred tone
          </Text>
        </Pressable>
      </ExpansionTile>
    </SectionCard>
  );
};

export default NotificationSection;

const styles = StyleSheet.create({});
