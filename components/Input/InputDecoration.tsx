import React, { FC, ReactNode, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import Box from "../Box";
import Text from "../Text";

type RenderProps = {
  onFocus?: () => void;
  onBlur?: () => void;
};

export type InputDecorationProps = {
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  onPrefixIconPressed?: () => void;
  onSuffixIconPressed?: () => void;
  style?: StyleProp<ViewProps>;
  renderInput?: (props: RenderProps) => React.ReactNode;
};

const InputDecoration: FC<InputDecorationProps> = ({
  label,
  disabled = false,
  error,
  helperText,
  onPrefixIconPressed,
  onSuffixIconPressed,
  prefixIcon,
  suffixIcon,
  style,
  renderInput,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Box width={"100%"} gap={"s"}>
      {label && (
        <Text variant={"bodyMedium"} color={disabled ? "hintColor" : "text"}>
          {label}
        </Text>
      )}
      <Box
        borderWidth={isFocused ? 2 : 1}
        borderRadius={"small"}
        borderColor={
          error
            ? "error"
            : isFocused
            ? "primary"
            : disabled
            ? "hintColor"
            : "outline"
        }
        flexDirection={"row"}
        alignItems={"center"}
        width={"100%"}
        p={"s"}
        gap={"s"}
        style={style}
      >
        {prefixIcon && (
          <TouchableOpacity
            onPress={onPrefixIconPressed}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {prefixIcon}
          </TouchableOpacity>
        )}
        <Box flex={1}>
          {renderInput?.({
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
          })}
        </Box>
        {suffixIcon && (
          <TouchableOpacity
            onPress={onSuffixIconPressed}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {suffixIcon}
          </TouchableOpacity>
        )}
      </Box>
      {(error || helperText) && (
        <Text variant={"bodySmall"} color={error ? "error" : "hintColor"}>
          {error || helperText}
        </Text>
      )}
    </Box>
  );
};

export default InputDecoration;

const styles = StyleSheet.create({});
