import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Button, ErrorState, Text } from "@/components";
import { useNotification } from "@/lib/notification";

const UpcomingNotifications = () => {
  const { error, expoPushToken, notification } = useNotification();

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
        <Text fontWeight={"700"}>Upcoming Notifications</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text color={"primary"}>Schedule Reminder</Text>
        </TouchableOpacity>
      </Box>
      <Text color={"success"}>
        {JSON.stringify(notification?.request.content.data, null, 2)}
      </Text>
    </Box>
  );
};

export default UpcomingNotifications;

const styles = StyleSheet.create({});
