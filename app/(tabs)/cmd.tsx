import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Box,
  Dropdown,
  EmptyState,
  ErrorState,
  ImageViewer,
  Logo,
  TabView,
  ThemedPageLayout,
} from "@/components";
import { Link } from "expo-router";

const Command = () => {
  return (
    <ThemedPageLayout>
      <Box flex={1} p={"m"}>
        <Dropdown.Select
          data={[{ label: "One", value: "1" }]}
          labelAccessorKey="label"
          valueAccessorKey="value"
          label="Devices to send command to"
          helperText="help text"
          searchable
        />
      </Box>
    </ThemedPageLayout>
  );
};

export default Command;

const styles = StyleSheet.create({});
