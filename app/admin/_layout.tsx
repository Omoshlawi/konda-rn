import { Stack } from "expo-router";
import React from "react";

const AdminLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="stages" />
    </Stack>
  );
};

export default AdminLayout;
