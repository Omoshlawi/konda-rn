import {
  AppBar,
  Box,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ExpansionTile,
  ListTileSkeleton,
  ThemedPageLayout,
  When,
  Text,
  SwipableAction,
  SwipableActionButton,
} from "@/components";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useStages } from "../hooks";
import { showModal } from "@/lib/overlays";
import StageForm from "../forms/StageForm";
import { useTheme } from "@/lib/theme";

const StagesScreen = () => {
  const theme = useTheme();
  const stagesAsync = useStages();
  const actions = useMemo<SwipableActionButton[]>(
    () => [
      {
        label: "Delete",
        onPress: () => console.log("Pressed one"),
        backgroundColor: theme.colors.error,
        labelColor: "white",
        accessibilityLabel: "delete stage",
        isLoading: false,
      },
      {
        label: "Edit",
        onPress: () => console.log("Pressed two"),
        backgroundColor: theme.colors.secondary,
        labelColor: "white",
        accessibilityLabel: "edit stage",
        isLoading: true,
      },
    ],
    [theme]
  );
  const handleaddStage = () => {
    const dispose = showModal(
      <StageForm
        onSuccess={() => {
          dispose();
        }}
      />,
      { title: "Add stage" }
    );
  };
  return (
    <ThemedPageLayout>
      <AppBar
        title="Stages"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleaddStage}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"s"}>
        <When
          asyncState={{ ...stagesAsync, data: stagesAsync.stages }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          error={(err) => <ErrorState error={err} />}
          success={(stages) => {
            if (!stages.length) return <EmptyState message="No stages found" />;
            return (
              <FlatList
                data={stages}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <SwipableAction actionButtons={actions}>
                    <ExpansionTile
                      leading={
                        <ExpoIconComponent family="FontAwesome6" name="bus" />
                      }
                      title={item.name}
                      subtitle={`${item.county?.name}, ${item.subCounty?.name}`}
                      borderBottom
                    >
                      <Box>
                        <Text>{`Radius: ${item.radius} `}</Text>
                        <Text>{`Latitude: ${item.latitude} `}</Text>
                        <Text>{`Longitude: ${item.longitude} `}</Text>
                      </Box>
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

export default StagesScreen;

const styles = StyleSheet.create({});
