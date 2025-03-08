import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Dropdown, ThemedPageLayout } from "@/components";
import { Shell } from "../widgets";

const CommandAndControlScreen = () => {
  return (
    <ThemedPageLayout>
      <Box p={"m"} flex={1}>
        {/* <Dropdown.Select
          data={[{ label: "One", value: "1" }]}
          labelAccessorKey="label"
          valueAccessorKey="value"
          label="Devices to send command to"
          helperText="help text"
          searchable
        /> */}
        <Shell />
      </Box>
    </ThemedPageLayout>
  );
};

export default CommandAndControlScreen;

const styles = StyleSheet.create({});
