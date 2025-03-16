import { Stack } from "expo-router";
import React from "react";

const AdminLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="stages" />
      <Stack.Screen name="routes" />
      <Stack.Screen name="operators" />
      <Stack.Screen name="fleets" />
    </Stack>
  );
};

export default AdminLayout;
