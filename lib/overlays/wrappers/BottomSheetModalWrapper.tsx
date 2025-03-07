import { useTheme } from "@/lib/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, memo, useCallback } from "react";
import {
  DimensionValue,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "@/components";
interface BottomSheetModalWrapperProps {
  /**
   * Content to be rendered inside the bottom sheet
   */
  children: React.ReactNode;

  /**
   * Title text to show in the header
   */
  title?: string;

  /**
   * Height of the bottom sheet
   * @default "25%"
   */
  height?: DimensionValue;

  /**
   * Whether the sheet can be dismissed by tapping outside
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback fired when the sheet is dismissed
   */
  onDismiss?: () => void;

  /**
   * Whether the sheet is currently visible
   * @default true
   */
  visible?: boolean;
}

const BottomSheetModalWrapper: FC<BottomSheetModalWrapperProps> = memo(
  ({
    children,
    title,
    height = "25%",
    dismissible = false,
    onDismiss,
    visible = true,
  }) => {
    const theme = useTheme();

    const handleDismiss = useCallback(() => {
      if (dismissible && onDismiss) {
        onDismiss();
      }
    }, [dismissible, onDismiss]);

    if (!visible) return null;

    return (
      <>
        {dismissible && (
          <TouchableWithoutFeedback
            onPress={handleDismiss}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Dismiss bottom sheet"
            accessibilityHint="Double tap to dismiss the bottom sheet"
          >
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
        )}

        <View
          style={[
            styles.modalContent,
            {
              height,
              backgroundColor: theme.colors.skeleton,
              borderTopRightRadius: theme.borderRadii.large,
              borderTopLeftRadius: theme.borderRadii.large,
            },
          ]}
          accessibilityRole="alert"
          accessibilityLabel={title || "Bottom sheet"}
          accessibilityViewIsModal={true}
        >
          <View
            style={[
              styles.titleContainer,
              {
                backgroundColor: theme.colors.onSkeleton,
                borderTopRightRadius: theme.borderRadii.large,
                borderTopLeftRadius: theme.borderRadii.large,
                paddingHorizontal: theme.spacing.m,
              },
            ]}
          >
            <Text
              variant="titleMedium"
              color="text"
              p="m"
              accessibilityRole="header"
            >
              {title}
            </Text>
            {dismissible && (
              <Pressable
                onPress={handleDismiss}
                accessibilityRole="button"
                accessibilityLabel="Close bottom sheet"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.closeButtonPressed,
                ]}
              >
                <MaterialIcons
                  name="close"
                  color={theme.colors.icon}
                  size={22}
                />
              </Pressable>
            )}
          </View>

          <View style={styles.content}>{children}</View>
        </View>
      </>
    );
  }
);

BottomSheetModalWrapper.displayName = "BottomSheetModalWrapper";

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
  },
  closeButtonPressed: {
    opacity: 0.7,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

export default BottomSheetModalWrapper;
