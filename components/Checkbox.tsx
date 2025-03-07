import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "./Text"
import Box from "./Box"
import { useTheme } from "@/lib/theme";

type Props = {
  label?: string;
  value?: boolean;
  onValueChange?: (changed: boolean) => void;
  error?: string;
  helperText?: string;
};

const Checkbox: React.FC<Props> = ({
  label,
  onValueChange,
  value,
  error,
  helperText,
}) => {
  const theme = useTheme();
  return (
    <Box gap={"s"}>
      <TouchableOpacity
        style={[styles.container]}
        activeOpacity={0.5}
        onPress={() => onValueChange?.(!value)}
      >
        <View
          style={[
            styles.checkboxOuter,
            value && { borderColor: theme.colors.outline },
          ]}
        >
          {value && (
            <View
              style={[
                styles.checkboxInner,
                { backgroundColor: theme.colors.primary },
              ]}
            />
          )}
        </View>
        {label && (
          <Text color={"text"} style={[styles.itemText]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
      {(error || helperText) && (
        <Text variant={"bodySmall"} color={error ? "error" : "hintColor"}>
          {error || helperText}
        </Text>
      )}
    </Box>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxOuter: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  checkboxInner: {
    width: 10,
    height: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
