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

const StagesScreen = () => {
  const stagesAsync = useStages();
  const actions = useMemo<SwipableActionButton[]>(
    () => [
      {
        label: "One",
        onPress: () => console.log("Pressed one"),
        backgroundColor: "red",
        labelColor: "white",
        accessibilityLabel: "actione one",
        isLoading: false,
      },
      {
        label: "Two",
        onPress: () => console.log("Pressed two"),
        backgroundColor: "blue",
        labelColor: "white",
        accessibilityLabel: "actione two",
        isLoading: false,
      },
    ],
    []
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
                  <SwipableAction
                    actionButtons={actions}
                    enableOnboarding={false}
                  >
                    <ExpansionTile
                      leading={
                        <ExpoIconComponent family="FontAwesome6" name="bus" />
                      }
                      title={item.name}
                      subtitle={`${item.county?.name}, ${item.subCounty?.name}`}
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
