import { StyleSheet } from "react-native";
import React from "react";
import { ThemedPageLayout, Text, AppBar } from "@/components";

const FleetsScreen = () => {
  return (
    <ThemedPageLayout>
      <AppBar title="Fleets" />
      <Text>Fleets</Text>
    </ThemedPageLayout>
  );
};

export default FleetsScreen;

const styles = StyleSheet.create({});
