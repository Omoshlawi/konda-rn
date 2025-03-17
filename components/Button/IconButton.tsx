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

type Variant = "tonal" | "outline" | "filled" | "ghost";

type Props = {
  icon: ExpoIcon;
  onPress?: () => void;
  variant?: Variant;
  borderRadius?: string | AnimatableNumericValue;
  color?: string;
  size?: number;
  iconSize?: number;
  padding?: number;
  aspectRatio?: number;
  borderWidth?: number;
  underlayColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconPosition?: "left" | "right" | "top" | "bottom" | "center";
  pressEffect?: "opacity" | "scale";
  shadow?: boolean;
};

const IconButton: FC<Props> = ({
  icon,
  onPress,
  variant = "filled",
  borderRadius = "50%",
  color,
  size = 28,
  iconSize,
  padding,
  aspectRatio = 1,
  borderWidth = 1,
  underlayColor,
  containerStyle,
  iconPosition = "center",
  pressEffect = "opacity",
  shadow = false,
}) => {
  const theme = useTheme();

  const colors = useMemo(() => {
    if (variant === "filled")
      return {
        backgroundColor: color ?? theme.colors.primary,
        color: theme.colors.onPrimary,
        underlayColor:
          underlayColor ??
          Color(color ?? theme.colors.primary)
            .darken(0.2)
            .toString(),
      };
    else if (variant === "outline")
      return {
        backgroundColor: "transparent",
        color: color ?? theme.colors.outline,
        underlayColor:
          underlayColor ??
          Color(color ?? theme.colors.outline)
            .lighten(0.8)
            .toString(),
      };
    else if (variant === "ghost")
      return {
        backgroundColor: "transparent",
        color: color ?? theme.colors.primary,
        underlayColor:
          underlayColor ??
          Color(color ?? theme.colors.primary)
            .lighten(0.8)
            .toString(),
      };
    else
      return {
        backgroundColor: Color(color ?? theme.colors.primary)
          .lighten(0.7)
          .toString(),
        color: color ?? theme.colors.primary,
        underlayColor:
          underlayColor ??
          Color(color ?? theme.colors.primary)
            .lighten(0.8)
            .toString(),
      };
  }, [variant, color, underlayColor, theme]);

  const iconStyles = useMemo(() => {
    const positionStyles = {
      left: { marginRight: theme.spacing.s },
      right: { marginLeft: theme.spacing.s },
      top: { marginBottom: theme.spacing.s },
      bottom: { marginTop: theme.spacing.s },
      center: {},
    };
    return positionStyles[iconPosition];
  }, [iconPosition, theme]);

  return (
    <TouchableHighlight
      style={[
        {
          backgroundColor: colors.backgroundColor,
          padding: padding ?? theme.spacing.s,
          borderRadius: borderRadius,
          alignSelf: "flex-start",
          aspectRatio: aspectRatio,
          justifyContent: "center",
          alignItems: "center",
          ...(shadow && {
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }),
        },
        variant === "outline" && {
          borderWidth: borderWidth,
          borderColor: color ?? theme.colors.outline,
        },
        containerStyle,
      ]}
      underlayColor={colors.underlayColor}
      onPress={onPress}
    >
      <ExpoIconComponent
        {...icon}
        color={colors.color}
        size={iconSize ?? size}
        style={iconStyles}
      />
    </TouchableHighlight>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
