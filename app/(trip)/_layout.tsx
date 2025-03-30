import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const TripLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="route" />
    </Stack>
  );
};

export default TripLayout;

const styles = StyleSheet.create({});
