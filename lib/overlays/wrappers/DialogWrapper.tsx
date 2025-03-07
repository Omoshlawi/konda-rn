import { Box } from "@/components";
import React, { FC, memo, useCallback } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

interface DialogWrapperProps {
  /**
   * Content to be rendered inside the dialog
   */
  children: React.ReactNode;

  /**
   * Whether the dialog can be dismissed by clicking outside
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback fired when the dialog is dismissed
   */
  onDismiss?: () => void;

  /**
   * Custom background color for the overlay
   * @default rgba(0,0,0,0.5)
   */
  overlayColor?: string;

  /**
   * Custom styles for the dialog container
   */
  containerStyle?: ViewStyle;

  /**
   * Whether the dialog is currently visible
   * @default true
   */
  visible?: boolean;

  /**
   * Maximum height of the dialog content as percentage
   * @default 80
   */
  maxHeightPercentage?: number;
}

const DialogWrapper: FC<DialogWrapperProps> = memo(
  ({
    children,
    dismissible = false,
    onDismiss,
    overlayColor,
    containerStyle,
    visible = true,
    maxHeightPercentage = 80,
  }) => {
    const handleDismiss = useCallback(() => {
      if (dismissible && onDismiss) {
        onDismiss();
      }
    }, [dismissible, onDismiss]);

    if (!visible) return null;

    return (
      <View
        style={[
          styles.container,
          overlayColor && { backgroundColor: overlayColor },
          containerStyle,
        ]}
        accessibilityRole="alert"
        accessibilityLabel="Dialog"
        accessibilityViewIsModal={true}
      >
        {dismissible && (
          <TouchableWithoutFeedback
            onPress={handleDismiss}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Dismiss dialog"
            accessibilityHint="Double tap to dismiss the dialog"
          >
            <View style={styles.dismissArea} />
          </TouchableWithoutFeedback>
        )}

        <Box
          margin="xl"
          borderRadius="large"
          backgroundColor="background"
          overflow="hidden"
          maxHeight={`${maxHeightPercentage}%`}
          style={styles.content}
        >
          {children}
        </Box>
      </View>
    );
  }
);

DialogWrapper.displayName = "DialogWrapper";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    width: "90%",
    maxWidth: 600,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
});

export default DialogWrapper;
