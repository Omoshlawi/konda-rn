import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RegistrationScreen } from "@/features/auth/screens";
import { OpenRoute } from "@/features/auth/authorization";

const Resgister = () => {
  return (
    <OpenRoute>
      <RegistrationScreen />
    </OpenRoute>
  );
};

export default Resgister;

const styles = StyleSheet.create({});
