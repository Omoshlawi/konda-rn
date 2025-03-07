import Color from "color";
import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Animated, BackHandler, StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  animation?: "none" | "slide" | "fade";
  /**
   * When request if from hardware same way Modal from react
   */
  onRequestDismiss?: () => void;
  transparent?: boolean;
  backgroundColor?: string;
}>;

const Overlay: FC<Props> = ({
  children,
  animation = "none",
  onRequestDismiss,
  transparent = false,
  backgroundColor,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // Handle hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onRequestDismiss) {
          onRequestDismiss();
          return true;
        }
        return false;
      }
    );

    // Start animation when component mounts
    if (animation === "fade") {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (animation === "slide") {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }

    // Cleanup
    return () => {
      backHandler.remove();
    };
  }, []);

  const getAnimationStyle = () => {
    if (animation === "fade") {
      return {
        opacity: fadeAnim,
      };
    } else if (animation === "slide") {
      return {
        transform: [{ translateY: slideAnim }],
      };
    }
    return {};
  };

  const _backgroundColor = transparent
    ? "transparent"
    : Color("black").alpha(0.5).toString();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: backgroundColor ?? _backgroundColor,
          },
          getAnimationStyle(),
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
