import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, ThemedPageLayout } from "@/components";
import { DashboardMenuItem } from "../widgets";
import { menuItems } from "../utils/constants";

const AdminLandingScreen = () => {
  return (
    <ThemedPageLayout>
      <AppBar title="Admin Dashboard" />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        numColumns={3}
        data={menuItems}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => <DashboardMenuItem item={item} />}
      />
    </ThemedPageLayout>
  );
};

export default AdminLandingScreen;

const styles = StyleSheet.create({});
