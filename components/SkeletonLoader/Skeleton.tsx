import { useTheme } from "@/lib/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  View,
  ViewProps
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";

interface SkeletonProps extends ViewProps {
  // Skeleton-specific props
  isLoading?: boolean;
  shimmerColor?: string;
  backgroundColor?: string;
  shimmerSpeed?: number;
  shimmerDirection?: "rtl" | "ltr";

  // Animation customization
  shimmerWidth?: number | string;
  gradientOpacity?: number;

  // Children props for more complex scenarios
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  // Skeleton-specific defaults
  isLoading = true,
  shimmerColor = "rgba(255,255,255,0.2)",
  shimmerSpeed = 1500,
  shimmerDirection = "rtl",
  shimmerWidth = "100%",
  gradientOpacity = 0.1,
  backgroundColor,

  // Spread all View props
  style,
  children,
  ...viewProps
}) => {
  // Shimmer animation
  const shimmerAnimation = useSharedValue(0);
  const { colors } = useTheme();

  React.useEffect(() => {
    if (isLoading) {
      shimmerAnimation.value = withRepeat(
        withTiming(1, { duration: shimmerSpeed }),
        -1,
        true
      );
    }
  }, [isLoading, shimmerSpeed]);

  // Dynamic shimmer animation style
  const animatedShimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerAnimation.value,
      [0, 1],
      shimmerDirection === "rtl" ? [-100, 100] : [100, -100]
    );

    return {
      transform: [{ translateX }],
      width: shimmerWidth,
    } as DefaultStyle;
  });

  // If not loading, render children normally
  if (!isLoading) {
    return (
      <View style={style} {...viewProps}>
        {children}
      </View>
    );
  }

  // Merge styles with default skeleton style
  const mergedStyle = [
    styles.skeletonBase,
    style,
    {
      backgroundColor:
        backgroundColor ??
        (style as any)?.backgroundColor ??
        colors.skeleton ??
        "#E1E9EE",
    },
  ];

  return (
    <View style={mergedStyle} {...viewProps}>
      {/* Preserve child structure if needed */}
      {children}

      {/* Shimmer layer */}
      <Animated.View
        style={[styles.shimmerContainer, animatedShimmerStyle as any]}
      >
        <LinearGradient
          colors={[
            "transparent",
            shimmerColor ?? colors?.onSkeleton,
            "transparent",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.shimmerGradient, { opacity: gradientOpacity }]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonBase: {
    overflow: "hidden",
    backgroundColor: "#E1E9EE",
  },
  shimmerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  shimmerGradient: {
    flex: 1,
    width: "100%",
  },
});

export default Skeleton;
