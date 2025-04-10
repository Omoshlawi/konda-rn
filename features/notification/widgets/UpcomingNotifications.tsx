import { Box, EmptyState, ErrorState, Text } from "@/components";
import { useNotification } from "@/lib/notification";
import { showModalBottomSheet } from "@/lib/overlays";
import { useTheme } from "@/lib/theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { NotificationReminderForm } from "../forms";

type UpcomingNotificationsProps = {
  fleetNo?: string;
};
const UpcomingNotifications: React.FC<UpcomingNotificationsProps> = ({
  fleetNo,
}) => {
  const { error, expoPushToken, notification } = useNotification();
  const theme = useTheme();
  const handleLaunchForm = () => {
    const dispose = showModalBottomSheet(
      <NotificationReminderForm
        fleetNo={fleetNo!}
        onSuccess={() => dispose()}
      />,
      {
        title: "Add reminder",
        height: "60%",
      }
    );
  };
  if (error)
    return (
      <ErrorState
        message={error?.message}
        detail="Error getting push notification"
      />
    );
  return (
    <Box flex={1} backgroundColor={"background"}>
      <Box flexDirection={"row"} justifyContent={"space-between"} pr={"s"}>
        <Text fontWeight={"700"} color={"text"}>
          Upcoming Notifications
        </Text>
        {fleetNo && (
          <TouchableOpacity activeOpacity={0.5} onPress={handleLaunchForm}>
            <Text color={"primary"}>Add Reminder</Text>
          </TouchableOpacity>
        )}
      </Box>
      <Text color={"success"}>
        {JSON.stringify(notification?.request.content.data, null, 2)}
      </Text>
      <Box flex={1} p={"m"}>
        <EmptyState message="No reminders" />
      </Box>
    </Box>
  );
};

export default UpcomingNotifications;

const styles = StyleSheet.create({});
