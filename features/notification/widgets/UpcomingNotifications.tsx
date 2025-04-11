import {
  Box,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  Text,
  When,
} from "@/components";
import { useNotification } from "@/lib/notification";
import { showModalBottomSheet } from "@/lib/overlays";
import { useTheme } from "@/lib/theme";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { NotificationReminderForm } from "../forms";
import { useReminders } from "../hooks";
import { useSession } from "@/lib/global-store";

type UpcomingNotificationsProps = {
  fleetNo?: string;
};
const UpcomingNotifications: React.FC<UpcomingNotificationsProps> = ({
  fleetNo,
}) => {
  const {
    error: notificationsError,
    isLoading: isLoadingNotifications,
    expoPushToken,
  } = useNotification();
  const { user } = useSession();
  const {
    error: remindersError,
    isLoading: isLoadingReminders,
    reminders,
  } = useReminders({
    userId: user?.id,
    expoPushToken,
    isSent: "false",
    v: "custom:include(routeStage:include(stage),trip:include(fleet))",
  });
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
  if (notificationsError)
    return (
      <ErrorState
        message={notificationsError.message}
        detail="Error getting push notification"
      />
    );
  return (
    <Box flex={1} backgroundColor={"background"}>
      <Box flexDirection={"row"} justifyContent={"space-between"} pr={"s"}>
        <Text fontWeight={"700"} color={"text"}>
          Upcoming Notification Reminders
        </Text>
        {fleetNo && (
          <TouchableOpacity activeOpacity={0.5} onPress={handleLaunchForm}>
            <Text color={"primary"}>Add Reminder</Text>
          </TouchableOpacity>
        )}
      </Box>
      <Box flex={1} py={"m"} gap={"s"}>
        <When
          asyncState={{
            isLoading: isLoadingNotifications || isLoadingReminders,
            error: remindersError,
            data: reminders,
          }}
          error={(e) => <ErrorState error={e} />}
          loading={() => (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </>
          )}
          success={(data) => {
            return (
              <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                ListEmptyComponent={
                  <EmptyState message="No upcoming reminders" />
                }
                renderItem={({ item }) => (
                  <ListTile
                    title={item.routeStage?.stage?.name}
                    subtitle={`${item?.trip?.fleet?.name}`}
                    leading={
                      <ExpoIconComponent family="FontAwesome" name="bell-o" />
                    }
                    borderBottom
                  />
                )}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default UpcomingNotifications;

const styles = StyleSheet.create({});
