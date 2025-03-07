import React, { FC, useMemo } from "react";
import {
  AnimatableNumericValue,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
} from "react-native";
import { ExpoIcon, ExpoIconComponent } from "../ExpoIcons";
import { useTheme } from "@/lib/theme";
import Color from "color";

type Variant = "tonal" | "outline" | "filled";

type Props = {
  icon: ExpoIcon;
  onPress?: () => void;
  variant?: Variant;
  borderRadius?: string | AnimatableNumericValue;
  color?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

const IconButton: FC<Props> = ({
  icon,
  onPress,
  variant = "filled",
  borderRadius = "50%",
  color,
  size = 28,
  containerStyle,
}) => {
  const theme = useTheme();

  const colors = useMemo(() => {
    if (variant === "filled")
      return {
        backgroundColor: color ?? theme.colors.primary,
        color: theme.colors.onPrimary,
        underlayColor: Color(color ?? theme.colors.primary)
          .darken(0.2)
          .toString(),
      };
    else if (variant === "outline")
      return {
        backgroundColor: "transparent",
        color: color ?? theme.colors.outline,
        underlayColor: Color(color ?? theme.colors.outline)
          .lighten(0.8)
          .toString(),
      };
    else
      return {
        backgroundColor: Color(color ?? theme.colors.primary)
          .lighten(0.7)
          .toString(),
        color: color ?? theme.colors.primary,
        underlayColor: Color(color ?? theme.colors.primary)
          .lighten(0.8)
          .toString(),
      };
  }, [variant]);

  return (
    <TouchableHighlight
      style={[
        {
          backgroundColor: colors.backgroundColor,
          padding: theme.spacing.s,
          borderRadius: borderRadius,
          alignSelf: "flex-start",
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        variant === "outline" && {
          borderWidth: 1,
          borderColor: color ?? theme.colors.outline,
        },
        containerStyle,
      ]}
      underlayColor={colors.underlayColor}
      onPress={onPress}
    >
      <ExpoIconComponent {...icon} color={colors.color} size={size} />
    </TouchableHighlight>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
