import { mutate } from "@/lib/api";
import { ConfirmDialog, showDialog, showModal } from "@/lib/overlays";
import { useTheme } from "@/lib/theme";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { RouteForm, RouteStageForm } from "../forms";
import { useRoutes, useRoutesApi } from "../hooks";
import { Route } from "../types";
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
import { RouteStages } from "../widgets";

const RoutesScreen = () => {
  const theme = useTheme();
  const routesAsync = useRoutes();
  const [loading, setLoading] = useState(false);
  const { deleteRoute } = useRoutesApi();
  const handleAddOrEditRoute = (route?: Route) => {
    const dispose = showModal(
      <RouteForm
        onSuccess={() => {
          dispose();
        }}
        route={route}
      />,
      { title: "Add Route" }
    );
  };

  const handleAddRouteStage = (route: Route) => {
    const dispose = showModal(
      <RouteStageForm
        onSuccess={() => {
          dispose();
        }}
        route={route}
      />,
      { title: "Add Route Stage" }
    );
  };

  const handleDelete = (route: Route) => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm delete"
        message={"Are you sure you want to delete route " + route.name}
        onCancel={() => dispose()}
        onConfirm={() => {
          setLoading(true);
          deleteRoute(route.id)
            .then(() => {
              mutate("/route");
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
        title="Routes"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleAddOrEditRoute()}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"s"}>
        <When
          asyncState={{ ...routesAsync, data: routesAsync.routes }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          error={(err) => <ErrorState error={err} />}
          success={(routes) => {
            if (!routes.length) return <EmptyState message="No routes found" />;
            return (
              <FlatList
                data={routes}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <SwipableAction
                    actionButtons={[
                      {
                        label: "Add Stage",
                        onPress: () => handleAddRouteStage(item),
                        backgroundColor: theme.colors.success,
                        labelColor: "white",
                        accessibilityLabel: "Add route stage",
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
                        onPress: () => handleAddOrEditRoute(item),
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
                        onPress: () => handleDelete(item),
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
                    <ExpansionTile
                      leading={
                        <ExpoIconComponent family="FontAwesome6" name="road" />
                      }
                      title={item.name}
                      subtitle={`${item.startPoint} - ${item.endPoint}`}
                      borderBottom
                    >
                      <Box>
                        <Text
                          color={"text"}
                        >{`Estimate Distance: ${item.distanceKm} km`}</Text>
                        <Text
                          color={"text"}
                        >{`estimate Duration: ${item.estimatedTimeMin} mins`}</Text>
                      </Box>
                      <RouteStages route={item} />
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

export default RoutesScreen;

const styles = StyleSheet.create({});
