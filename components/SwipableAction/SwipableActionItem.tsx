import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import Reanimated from "react-native-reanimated";
import { SwipableActionButton } from "./types";
import { FC, ReactNode } from "react";
import { useTheme } from "@/lib/theme";

type Props = {
  button: SwipableActionButton;
};

const SwipableActionItem: FC<Props> = ({ button }) => {
  const theme = useTheme();
  const {
    label,
    onPress,
    backgroundColor,
    labelColor,
    accessibilityLabel,
    isLoading = false,
    icon,
    iconPosition = "top",
    disableWhenLoading = true,
    style,
    textStyle,
    loadingIndicatorColor = theme.colors.primary,
  } = button;

  // Determine flex direction based on icon position
  const getFlexDirection = () => {
    switch (iconPosition) {
      case "left":
        return "row";
      case "right":
        return "row-reverse";
      case "top":
        return "column";
      case "bottom":
        return "column-reverse";
      default:
        return "column";
    }
  };

  return (
    <Reanimated.View style={[styles.actionButtonContainer, style]}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor },
          { flexDirection: getFlexDirection() },
        ]}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        disabled={disableWhenLoading && isLoading}
      >
        {isLoading && (
          <ActivityIndicator
            color={loadingIndicatorColor || labelColor}
            style={styles.loadingIndicator}
          />
        )}

        {!isLoading && icon && <View style={styles.iconContainer}>{icon}</View>}

        {!isLoading && (
          <Text
            style={[
              styles.actionButtonText,
              { color: labelColor },
              textStyle,
              isLoading && styles.textWithLoading,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    flexGrow: 1,
    width: 64,
  },
  actionButton: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  actionButtonText: {
    fontWeight: 600,
    textAlign: "center",
  },
  textWithLoading: {
    marginLeft: 8, // Add spacing when loading indicator is present
  },
  iconContainer: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
  loadingIndicator: {
    marginRight: 4,
    marginLeft: 4,
  },
});

export default SwipableActionItem;
