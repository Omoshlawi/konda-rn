import {
  Box,
  Button,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  Text,
  When,
} from "@/components";
import { useFleetRoutes, useFleets } from "@/features/admin/hooks";
import { handleApiErrors } from "@/lib/api";
import { useNotification } from "@/lib/notification";
import { showSnackbar } from "@/lib/overlays";
import { useTheme } from "@/lib/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import Color from "color";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FlatList, StyleSheet } from "react-native";
import { mutate } from "swr";
import { useRemindersApi } from "../hooks";
import { NotificationReminder, NotificationReminderFormData } from "../types";
import { NotificationReminderSchema } from "../utils/validation";
import { useFleetInterstageMovementStream } from "@/features/trip/hooks";
import { FleetRouteInterStageMovement } from "@/features/trip/types";
type Props = {
  fleetNo: string;
  lastKnownTripInfo: FleetRouteInterStageMovement;
  onSuccess?: (notification: NotificationReminder) => void;
};
const NotificationReminderForm: React.FC<Props> = ({
  fleetNo,
  onSuccess,
  lastKnownTripInfo,
}) => {
  const { createReminder } = useRemindersApi();
  const { expoPushToken } = useNotification();
  const form = useForm<NotificationReminderFormData>({
    defaultValues: {
      fleetNo,
      expoPushToken: "",
      routeStageId: "",
    },
    resolver: zodResolver(NotificationReminderSchema),
  });
  const {
    fleets,
    isLoading: isFleetsLoading,
    error: fleetsErros,
  } = useFleets({ name: fleetNo });
  const stagesAsync = useFleetRoutes(fleets[0]?.id, {
    includeOnlyActiveFleetRoutes: "true",
    v: "custom:include(fleet,route:include(stages:include(stage:include(county,subCounty))))",
  });
  const theme = useTheme();
  const observableRouteStage = form.watch("routeStageId");
  const onSubmit: SubmitHandler<NotificationReminderFormData> = async (
    data
  ) => {
    try {
      const res = await createReminder(data);
      onSuccess?.(res);
      mutate("/notification-reminders");
      showSnackbar({
        title: "success",
        subtitle: `Reminder added succesfully`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<NotificationReminderFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof NotificationReminderFormData, {
            message: val,
          })
        );
    }
  };

  useEffect(() => {
    if (expoPushToken) form.setValue("expoPushToken", expoPushToken);
  }, [expoPushToken, form]);

  useEffect(() => {
    Object.keys(form.formState.errors).forEach((field) => {
      const message =
        form.formState.errors[field as keyof NotificationReminderFormData]
          ?.message;
      showSnackbar({ kind: "error", title: field, subtitle: message });
    });
  }, [form.formState.errors]);

  return (
    <Box flex={1} p={"m"} gap={"s"}>
      <When
        asyncState={{
          isLoading: stagesAsync.isLoading || isFleetsLoading,
          error: fleetsErros ?? stagesAsync.error,
          data: stagesAsync.fleetRoutes,
        }}
        loading={() => (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ListTileSkeleton key={index} />
            ))}
          </>
        )}
        error={(err) => <ErrorState error={err} />}
        success={(data) => {
          if (!data.length && !data[0]?.route?.stages?.length)
            return (
              <EmptyState
                message={"No active fleet routes for fleet " + fleetNo}
              />
            );
          const activeFleetRoute = data[0];
          const stagesInOrder = activeFleetRoute?.route?.stages?.sort((a, b) =>
            lastKnownTripInfo.traversalDirection === "Forward"
              ? a.order - b.order
              : b.order - a.order
          );

          return (
            <>
              <Text p={"m"} fontWeight={"700"} color={"primary"}>
                Remind me when i arrive at stage?
              </Text>
              <FlatList
                data={stagesInOrder ?? []}
                keyExtractor={({ id }) => id}
                renderItem={({ item, index }) => {
                  const order =
                    lastKnownTripInfo.traversalDirection === "Forward"
                      ? item.order
                      : stagesInOrder!.length - (item.order + 1);
                  return (
                    <ListTile
                      title={`${order}. ${item?.stage?.name}`}
                      leading={
                        <ExpoIconComponent family="FontAwesome6" name="bus" />
                      }
                      containerStyles={{
                        backgroundColor:
                          observableRouteStage === item.id
                            ? Color(theme.colors.primary).alpha(0.2).toString()
                            : undefined,
                      }}
                      onPress={() => form.setValue("routeStageId", item.id)}
                      trailing={
                        <ExpoIconComponent
                          family="MaterialCommunityIcons"
                          name="chevron-right"
                          size={20}
                        />
                      }
                      subtitle={`${item.stage?.county?.name}, ${item.stage?.subCounty?.name}`}
                      borderBottom
                    />
                  );
                }}
              />
              <Button
                title="confirm and submit"
                onPress={form.handleSubmit(onSubmit)}
                loading={form.formState.isSubmitting}
              />
            </>
          );
        }}
      />
    </Box>
  );
};

export default NotificationReminderForm;

const styles = StyleSheet.create({});
