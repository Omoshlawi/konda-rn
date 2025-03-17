import React, { FC, ReactNode, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import Box from "../Box";
import Text from "../Text";
import Color from "color";
import { useTheme } from "@/lib/theme";

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
  const theme = useTheme();
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
        p={!(prefixIcon || suffixIcon) ? "s" : undefined}
        pl={!prefixIcon ? "s" : undefined}
        style={style}
      >
        {prefixIcon && (
          <TouchableHighlight
            underlayColor={Color(theme.colors.primary).lighten(0.8).toString()}
            onPress={onPrefixIconPressed}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: theme.spacing.s,
              borderRadius: "50%",
              alignSelf: "flex-start",
              aspectRatio: 1,
            }}
          >
            {prefixIcon}
          </TouchableHighlight>
        )}
        <Box flex={1}>
          {renderInput?.({
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
          })}
        </Box>
        {suffixIcon && (
          <TouchableHighlight
            onPress={onSuffixIconPressed}
            underlayColor={Color(theme.colors.primary).lighten(0.8).toString()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: theme.spacing.s,
              borderRadius: "50%",
              alignSelf: "flex-start",
              aspectRatio: 1,
            }}
          >
            {suffixIcon}
          </TouchableHighlight>
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
