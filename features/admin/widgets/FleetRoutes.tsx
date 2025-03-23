import { mutate } from "@/lib/api";
import { useTheme } from "@/lib/theme";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { FleetRouteForm } from "../forms";
import { useFleetApi, useFleetRoutes } from "../hooks";
import { Fleet, FleetRoute } from "../types";

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
import {
  ConfirmDialog,
  showDialog,
  showModal,
  showSnackbar,
} from "@/lib/overlays";

type Props = {
  fleet: Fleet;
};

const FleetRoutes: FC<Props> = ({ fleet }) => {
  const asyncFleetRoutes = useFleetRoutes(fleet.id);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { deleteFleetRoute, activateFleetRoute } = useFleetApi();

  const handleEditFleetRoute = (fleetRoute: FleetRoute) => {
    const dispose = showModal(
      <FleetRouteForm
        onSuccess={() => {
          dispose();
        }}
        fleet={fleet}
        fleetRoute={fleetRoute}
      />,
      { title: "Edit Route Stage" }
    );
  };
  const handleActivateFleetRoute = (fleetRoute: FleetRoute) => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm Activation"
        message={`Are you sure you want to activate fleet route ${fleetRoute?.route?.name}?`}
        onCancel={() => dispose()}
        onConfirm={() => {
          setLoading(true);
          activateFleetRoute(fleet.id, fleetRoute.id)
            .then(() => {
              mutate(`/fleet/${fleet.id}/routes`);
              dispose();
            })
            .catch((err) => {
              showSnackbar({
                kind: "error",
                title: "Error Deleting",
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

  const handleDeleteRouteStage = (fleetRoute: FleetRoute) => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm Delete"
        message={`Are you sure you want to delete fleet route ${fleetRoute?.route?.name}?`}
        onCancel={() => dispose()}
        onConfirm={() => {
          setLoading(true);
          deleteFleetRoute(fleet.id, fleetRoute.id, "PURGE")
            .then(() => {
              mutate(`/fleet/${fleet.id}/routes`);
              dispose();
            })
            .catch((err) => {
              showSnackbar({
                kind: "error",
                title: "Error Deleting",
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
      asyncState={{ ...asyncFleetRoutes, data: asyncFleetRoutes.fleetRoutes }}
      error={(err) => (
        <Box height={400}>
          <ErrorState error={err} />
        </Box>
      )}
      loading={() => (
        <Box gap="s">
          {Array.from({ length: 3 }).map((_, index) => (
            <ListTileSkeleton key={index} />
          ))}
        </Box>
      )}
      success={(fleetRoutes) => {
        if (!fleetRoutes.length) {
          return (
            <Box height={400}>
              <EmptyState message="No routes available" />
            </Box>
          );
        }

        return (
          <Box mt="m" gap="s">
            <Text fontWeight="700" color="text">
              Routes
            </Text>
            {fleetRoutes.map((fleetRoute) => (
              <SwipableAction
                key={fleetRoute.id}
                actionButtons={[
                  {
                    label: "Activate",
                    onPress: () => handleActivateFleetRoute(fleetRoute),
                    backgroundColor: theme.colors.success,
                    labelColor: "white",
                    accessibilityLabel: "Edit fleet route",
                    icon: (
                      <ExpoIconComponent
                        family="Feather"
                        name="check-circle"
                        size={18}
                        color="white"
                      />
                    ),
                  },
                  {
                    label: "Edit",
                    onPress: () => handleEditFleetRoute(fleetRoute),
                    backgroundColor: theme.colors.secondary,
                    labelColor: "white",
                    accessibilityLabel: "Edit fleet route",
                    isLoading: loading,
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
                    onPress: () => handleDeleteRouteStage(fleetRoute),
                    backgroundColor: theme.colors.error,
                    labelColor: "white",
                    accessibilityLabel: "Delete fleet route",
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
                  leading={
                    <ExpoIconComponent
                      family="Feather"
                      name={fleetRoute.isActive ? "check-circle" : "x-circle"}
                      size={24}
                      color={
                        fleetRoute.isActive
                          ? theme.colors.success
                          : theme.colors.error
                      }
                    />
                  }
                  title={`${fleetRoute.route?.name} - ${
                    fleetRoute.isActive ? "Active" : "Inactive"
                  }`}
                  subtitle={`${fleetRoute?.route?.startPoint}, ${fleetRoute?.route?.endPoint}`}
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

export default FleetRoutes;

const styles = StyleSheet.create({});
