import { OpenRoute } from "@/features/auth/authorization";
import { WelcomeScreen } from "@/features/auth/screens";
import React from "react";
import { StyleSheet } from "react-native";

const Index = () => {
  return (
    <OpenRoute>
      <WelcomeScreen />
    </OpenRoute>
  );
};

export default Index;

const styles = StyleSheet.create({});
