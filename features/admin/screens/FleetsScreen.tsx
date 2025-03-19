import {
  AppBar,
  Box,
  EmptyState,
  ErrorState,
  ExpansionTile,
  ExpoIconComponent,
  ListTileSkeleton,
  SwipableAction,
  Text,
  ThemedPageLayout,
  When,
} from "@/components";
import { mutate } from "@/lib/api";
import { ConfirmDialog, showDialog, showModal } from "@/lib/overlays";
import { useTheme } from "@/lib/theme";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { FleetForm, FleetRouteForm } from "../forms";
import { useFleet, useFleetApi } from "../hooks";
import { Fleet } from "../types";
import { FleetRoutes } from "../widgets";

const FleetsScreen = () => {
  const theme = useTheme();
  const fleetsAsync = useFleet();
  const [loading, setLoading] = useState(false);
  const { deleteFleet } = useFleetApi();
  const handleAddOrEditFleet = (fleet?: Fleet) => {
    const dispose = showModal(
      <FleetForm
        onSuccess={() => {
          dispose();
        }}
        fleet={fleet}
      />,
      { title: "Add Fleet" }
    );
  };

  const handleAddFleetRoute = (fleet: Fleet) => {
    const dispose = showModal(
      <FleetRouteForm
        onSuccess={() => {
          dispose();
        }}
        fleet={fleet}
      />,
      { title: "Add Fleet Route" }
    );
  };

  const handleDelete = (fleet: Fleet) => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm delete"
        message={"Are you sure you want to delete fleet " + fleet.name}
        onCancel={() => dispose()}
        onConfirm={() => {
          setLoading(true);
          deleteFleet(fleet.id)
            .then(() => {
              mutate("/fleet");
              dispose();
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
    );
  };

  return (
    <ThemedPageLayout>
      <AppBar
        title="Fleets"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleAddOrEditFleet()}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"s"}>
        <When
          asyncState={{ ...fleetsAsync, data: fleetsAsync.fleets }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          error={(err) => <ErrorState error={err} />}
          success={(fleets) => {
            if (!fleets.length) return <EmptyState message="No fleets found" />;
            return (
              <FlatList
                data={fleets}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <SwipableAction
                    actionButtons={[
                      {
                        label: "Add Route",
                        onPress: () => handleAddFleetRoute(item),
                        backgroundColor: theme.colors.success,
                        labelColor: "white",
                        accessibilityLabel: "Add fleet route",
                        icon: (
                          <ExpoIconComponent
                            family="Feather"
                            name="plus"
                            size={18}
                            color="white"
                          />
                        ),
                      },
                      {
                        label: "Edit",
                        onPress: () => handleAddOrEditFleet(item),
                        backgroundColor: theme.colors.secondary,
                        labelColor: "white",
                        accessibilityLabel: "edit fleet",
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
                        onPress: () => handleDelete(item),
                        backgroundColor: theme.colors.error,
                        labelColor: "white",
                        accessibilityLabel: "delete fleet",
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
                    <ExpansionTile
                      leading={
                        <ExpoIconComponent family="FontAwesome6" name="bus" />
                      }
                      title={item.name}
                      subtitle={`${item.vehicleType}, ${item.plateNumber}`}
                      borderBottom
                    >
                      <Box>
                        <Text
                          color={"text"}
                        >{`Capacity: ${item.capacity} `}</Text>
                        <Text color={"text"}>{`Status: ${item.status} `}</Text>
                      </Box>
                      <FleetRoutes fleet={item} />
                    </ExpansionTile>
                  </SwipableAction>
                )}
              />
            );
          }}
        />
      </Box>
    </ThemedPageLayout>
  );
};

export default FleetsScreen;

const styles = StyleSheet.create({});
