import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Button, Text } from "@/components";

const UpcomingNotifications = () => {
  return (
    <Box flex={1} backgroundColor={"background"}>
      <Box flexDirection={"row"} justifyContent={"space-between"} pr={"s"}>
        <Text fontWeight={"700"}>Upcoming Notifications</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text color={"primary"}>Schedule Reminder</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default UpcomingNotifications;

const styles = StyleSheet.create({});
