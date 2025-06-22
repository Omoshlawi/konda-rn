import { Theme, useTheme } from "@/lib/theme";
import Color from "color";
import React, { FC, useMemo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import Text from "../Text";
type Variant = "primary" | "secondary" | "tertiary" | "ghost";
interface StyledButtonProps {
  title: string;
  variant?: Variant;
  onPress?: () => void;
  borderRadius?: keyof Theme["borderRadii"];
  renderIcon?: (props: { color: string; size: number }) => React.ReactNode;
  iconLeading?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  underlayColor?: string;
}

const Button: FC<StyledButtonProps> = ({
  title,
  variant = "primary",
  onPress,
  borderRadius = "small",
  renderIcon,
  iconLeading = true,
  labelStyle,
  style,
  loading = false,
  underlayColor,
}) => {
  const theme = useTheme();
  const colors = useMemo(() => {
    if (variant === "primary")
      return {
        backgroundColor: theme.colors.primary,
        underlayColor: Color(theme.colors.primary).darken(0.1).toString(),
        color: "white",
      };
    else if (variant === "secondary")
      return {
        backgroundColor: theme.colors.hintColor,
        underlayColor: Color(theme.colors.hintColor).darken(0.1).toString(),
        color: "white",
      };
    else if (variant === "tertiary")
      return {
        backgroundColor: "transparent",
        underlayColor: Color(theme.colors.primary).alpha(0.1).toString(),
        color: theme.colors.primary,
      };
    else
      return {
        backgroundColor: "transparent",
        underlayColor: Color(theme.colors.primary).alpha(0.1).toString(),
        color: theme.colors.primary,
      };
  }, [variant]);
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={loading}
      style={[
        styles.btn,
        {
          padding: theme.spacing.m,
          borderRadius: borderRadius && theme.borderRadii[borderRadius],
          backgroundColor: colors.backgroundColor,
          gap: theme.spacing.s,
          flexDirection: iconLeading ? "row" : "row-reverse",
        },
        variant === "tertiary" && {
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
        style,
      ]}
      underlayColor={underlayColor ?? colors.underlayColor}
    >
      {loading ? (
        <ActivityIndicator color={colors.color} />
      ) : (
        <View style={{ flexDirection: iconLeading ? "row" : "row-reverse", alignItems: "center", gap: theme.spacing.s }}>
          {typeof renderIcon === "function" &&
            renderIcon({ color: colors.color, size: 18 })}
          <Text
            textAlign={"center"}
            style={[{ color: colors.color }, labelStyle]}
            fontWeight={"700"}
            variant={"bodyLarge"}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
