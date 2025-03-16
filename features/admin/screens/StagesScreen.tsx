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
import { useStages, useStagesApi } from "../hooks";
import { ConfirmDialog, showDialog, showModal } from "@/lib/overlays";
import { StageForm } from "../forms";
import { useTheme } from "@/lib/theme";
import { Stage } from "../types";
import { mutate } from "@/lib/api";

const StagesScreen = () => {
  const theme = useTheme();
  const stagesAsync = useStages();
  const [loading, setLoading] = useState(false);
  const { deleteStage } = useStagesApi();
  const handleaddOrEditStage = (stage?: Stage) => {
    const dispose = showModal(
      <StageForm
        onSuccess={() => {
          dispose();
        }}
        stage={stage}
      />,
      { title: "Add stage" }
    );
  };

  const handleDelete = (stage: Stage) => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm delete"
        message={"Are you sure you want to delete stage " + stage.name}
        onCancel={() => dispose()}
        onConfirm={() => {
          setLoading(true);
          deleteStage(stage.id)
            .then(() => {
              mutate("/stage");
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
        title="Stages"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleaddOrEditStage()}
          >
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
                    actionButtons={[
                      {
                        label: "Delete",
                        onPress: () => handleDelete(item),
                        backgroundColor: theme.colors.error,
                        labelColor: "white",
                        accessibilityLabel: "delete stage",
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
                      {
                        label: "Edit",
                        onPress: () => handleaddOrEditStage(item),
                        backgroundColor: theme.colors.secondary,
                        labelColor: "white",
                        accessibilityLabel: "edit stage",
                        icon: (
                          <ExpoIconComponent
                            family="Feather"
                            name="edit"
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
                      subtitle={`${item.county?.name}, ${item.subCounty?.name}`}
                      borderBottom
                    >
                      <Box>
                        <Text color={"text"}>{`Radius: ${item.radius} `}</Text>
                        <Text
                          color={"text"}
                        >{`Latitude: ${item.latitude} `}</Text>
                        <Text
                          color={"text"}
                        >{`Longitude: ${item.longitude} `}</Text>
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
