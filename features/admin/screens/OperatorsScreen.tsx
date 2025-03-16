import { StyleSheet } from "react-native";
import React from "react";
import { ThemedPageLayout, Text, AppBar } from "@/components";

const OperatorsScreen = () => {
  return (
    <ThemedPageLayout>
      <AppBar title="Operators" />
      <Text>OperatorsScreen</Text>
    </ThemedPageLayout>
  );
};

export default OperatorsScreen;

const styles = StyleSheet.create({});
