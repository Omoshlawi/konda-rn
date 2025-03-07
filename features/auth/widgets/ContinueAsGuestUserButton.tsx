import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@/components";
import { useRouter } from "expo-router";

const ContinueAsGuestUserButton = () => {
  const router = useRouter();

  return (
    <Button
      title="Continue as guest user"
      variant="secondary"
      onPress={() => router.navigate("/home")}
    />
  );
};

export default ContinueAsGuestUserButton;

const styles = StyleSheet.create({});
