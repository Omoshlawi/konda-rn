import {
  Box,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  SwipableAction,
  Text,
  When,
} from "@/components";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { useRoutesApi, useRouteStages } from "../hooks";
import { Route, RouteStage } from "../types";
import { useTheme } from "@/lib/theme";
import {
  ConfirmDialog,
  showDialog,
  showModal,
  showSnackbar,
} from "@/lib/overlays";
import { RouteStageForm } from "../forms";
import { mutate } from "@/lib/api";

type Props = {
  route: Route;
};

const Routestages: FC<Props> = ({ route }) => {
  const asyncRouteStages = useRouteStages(route.id);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { deleteRouteStage } = useRoutesApi();
  const handleEditRouteStage = (routeStage: RouteStage) => {
    const dispose = showModal(
      <RouteStageForm
        onSuccess={() => {
          dispose();
        }}
        route={route}
        routeStage={routeStage}
      />,
      { title: "Edit Route stage" }
    );
  };
  const handleDeleteRouteStage = (routeStage: RouteStage) => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm delete"
        message={
          "Are you sure you want to delete route stage" +
          routeStage?.stage?.name
        }
        onCancel={() => dispose()}
        onConfirm={() => {
          setLoading(true);
          deleteRouteStage(route.id, routeStage.id, "PURGE")
            .then(() => {
              mutate(`/route/${route.id}/stages`);
              dispose();
            })
            .catch((err) => {
              showSnackbar({
                kind: "error",
                title: "Error deleting",
                subtitle: err?.response?.detail,
              });
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
    );
  };
  return (
    <When
      asyncState={{ ...asyncRouteStages, data: asyncRouteStages.routeStages }}
      error={(err) => (
        <Box height={400}>
          <ErrorState error={err} />
        </Box>
      )}
      loading={() => (
        <Box gap={"s"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <ListTileSkeleton key={index} />
          ))}
        </Box>
      )}
      success={(routestages) => {
        if (!routestages.length)
          return (
            <Box height={400}>
              <EmptyState message="No stages" />
            </Box>
          );
        return (
          <Box mt={"m"} gap={"s"}>
            <Text fontWeight={"700"} color={"text"}>
              Stages
            </Text>
            {routestages.map((routeStage) => (
              <SwipableAction
                actionButtons={[
                  {
                    label: "Edit",
                    onPress: () => handleEditRouteStage(routeStage),
                    backgroundColor: theme.colors.secondary,
                    labelColor: "white",
                    accessibilityLabel: "edit route",
                    icon: (
                      <ExpoIconComponent
                        family="Feather"
                        name="edit"
                        size={18}
                        color="white"
                      />
                    ),
                  },
                  {
                    label: "Delete",
                    onPress: () => handleDeleteRouteStage(routeStage),
                    backgroundColor: theme.colors.error,
                    labelColor: "white",
                    accessibilityLabel: "delete route",
                    isLoading: loading,
                    icon: (
                      <ExpoIconComponent
                        family="FontAwesome"
                        name="trash"
                        size={18}
                        color="white"
                      />
                    ),
                  },
                ]}
              >
                <ListTile
                  key={routeStage.id}
                  title={routeStage.stage?.name ?? "Hello"}
                  subtitle={`${routeStage?.stage?.county?.name}, ${routeStage?.stage?.subCounty?.name}`}
                  borderBottom
                />
              </SwipableAction>
            ))}
          </Box>
        );
      }}
    />
  );
};

export default Routestages;

const styles = StyleSheet.create({});
