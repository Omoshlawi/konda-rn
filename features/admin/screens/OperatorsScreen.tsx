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
import { useOperators, useOperatorsApi } from "../hooks";
import { ConfirmDialog, showDialog, showModal } from "@/lib/overlays";
import { OperatorForm } from "../forms";
import { useTheme } from "@/lib/theme";
import { Operator } from "../types";
import { mutate } from "@/lib/api";

const OperatorsScreen = () => {
  const theme = useTheme();
  const operatorsAsync = useOperators();
  const [loading, setLoading] = useState(false);
  const { deleteOperator } = useOperatorsApi();
  const handleAddOrEditOperator = (operator?: Operator) => {
    const dispose = showModal(
      <OperatorForm
        onSuccess={() => {
          dispose();
        }}
        operator={operator}
      />,
      { title: "Add Operator" }
    );
  };

  const handleDelete = (operator: Operator) => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm delete"
        message={"Are you sure you want to delete operator " + operator.name}
        onCancel={() => dispose()}
        onConfirm={() => {
          setLoading(true);
          deleteOperator(operator.id)
            .then(() => {
              mutate("/operator");
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
        title="Operators"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleAddOrEditOperator()}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"s"}>
        <When
          asyncState={{ ...operatorsAsync, data: operatorsAsync.operators }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          error={(err) => <ErrorState error={err} />}
          success={(operators) => {
            if (!operators.length)
              return <EmptyState message="No operators found" />;
            return (
              <FlatList
                data={operators}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <SwipableAction
                    actionButtons={[
                      {
                        label: "Delete",
                        onPress: () => handleDelete(item),
                        backgroundColor: theme.colors.error,
                        labelColor: "white",
                        accessibilityLabel: "delete operator",
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
                        onPress: () => handleAddOrEditOperator(item),
                        backgroundColor: theme.colors.secondary,
                        labelColor: "white",
                        accessibilityLabel: "edit operator",
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
                        <ExpoIconComponent family="FontAwesome6" name="user" />
                      }
                      title={item.name}
                      subtitle={item.contact}
                      borderBottom
                    >
                      <Box>
                        <Text
                          color={"text"}
                        >{`Created: ${item.createdAt} `}</Text>
                        <Text
                          color={"text"}
                        >{`Updated: ${item.updatedAt} `}</Text>
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

export default OperatorsScreen;

const styles = StyleSheet.create({});
