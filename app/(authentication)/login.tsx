import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LoginScreen } from "@/features/auth/screens";
import { OpenRoute } from "@/features/auth/authorization";

const logn = () => {
  return (
    <OpenRoute>
      <LoginScreen />
    </OpenRoute>
  );
};

export default logn;

const styles = StyleSheet.create({});
