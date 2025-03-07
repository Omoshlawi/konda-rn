import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { OpenRoute, WelcomeScreen } from "@/features/auth";

const Index = () => {
  return (
    <OpenRoute>
      <WelcomeScreen />
    </OpenRoute>
  );
};

export default Index;

const styles = StyleSheet.create({});
