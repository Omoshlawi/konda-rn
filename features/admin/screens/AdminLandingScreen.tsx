import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, Box, ThemedPageLayout } from "@/components";
import { DashboardMenuItem } from "../widgets";
import { menuItems } from "../utils/constants";

const AdminLandingScreen = () => {
  return (
    <ThemedPageLayout>
      <AppBar title="Admin Dashboard" />
      <Box flex={1} p={"m"}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{
            alignItems: "center",
          }}
          numColumns={2}
          data={menuItems}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => <DashboardMenuItem item={item} />}
        />
      </Box>
    </ThemedPageLayout>
  );
};

export default AdminLandingScreen;

const styles = StyleSheet.create({});
