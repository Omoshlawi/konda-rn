import { StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { ExpoIconComponent, TextInput } from "@/components";
import { useTheme } from "@/lib/theme";

type Props = {
  fleetNo?: string;
  onChangeFleetNo?: (fleetNo: string) => void;
};

const SearchTrip: FC<Props> = ({ fleetNo, onChangeFleetNo }) => {
  const [value, setValue] = useState<string | undefined>(fleetNo);
  const theme = useTheme();
  return (
    <TextInput
      inputDecorationStyle={{ borderRadius: theme.borderRadii.large * 2 }}
      prefixIcon={
        <ExpoIconComponent family="MaterialIcons" name="qr-code-scanner" />
      }
      value={value}
      onChangeText={setValue}
      suffixIcon={<ExpoIconComponent family="AntDesign" name="arrowright" />}
      placeholder="Scan QR or enter fleet Number"
      onPrefixIconPressed={() => {}}
      onSuffixIconPressed={
        value
          ? () => {
              onChangeFleetNo?.(value!);
            }
          : undefined
      }
    />
  );
};

export default SearchTrip;

const styles = StyleSheet.create({});
