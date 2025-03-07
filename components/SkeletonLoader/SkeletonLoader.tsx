import { useTheme } from "@/lib/theme";
import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  ViewStyle,
  StyleProp,
} from "react-native";

interface SkeletonLoaderProps extends PropsWithChildren {
  styles?: StyleProp<ViewStyle>;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  children,
  styles: _styles = {},
}) => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;
  const screenWidth = Dimensions.get("window").width;
  const theme = useTheme();

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const shimmerStyle = {
    transform: [
      {
        translateX: shimmerAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: [-screenWidth, screenWidth],
        }),
      },
    ],
  };

  return (
    <View
      style={[
        styles.skeletonItem,
        {
          borderRadius: theme.borderRadii.medium,
        },
        _styles,
      ]}
    >
      {children || (
        <View
          style={{
            height: 50,
            width: "100%",
            backgroundColor: theme.colors.skeleton,
          }}
        />
      )}
      <Animated.View style={[styles.shimmer, shimmerStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    opacity: 0.3,
  },
});

export default SkeletonLoader;
