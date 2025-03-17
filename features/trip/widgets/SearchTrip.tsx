import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ExpoIconComponent, TextInput } from "@/components";
import { useTheme } from "@/lib/theme";

const SearchTrip = () => {
  const theme = useTheme();
  return (
    <TextInput
      inputDecorationStyle={{ borderRadius: theme.borderRadii.large * 2 }}
      prefixIcon={
        <ExpoIconComponent family="MaterialIcons" name="qr-code-scanner" />
      }
      placeholder="Scan QR Code at the nack of the seat"
      onPrefixIconPressed={() => {}}
    />
  );
};

export default SearchTrip;

const styles = StyleSheet.create({});
