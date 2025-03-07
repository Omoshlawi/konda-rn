import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import APITest from "@/lib/api/APITest";
import ThemeTest from "@/components/ThemeTest";
import { ThemedPageLayout } from "@/components";

export default function HomeScreen() {
  return (
    <ThemedPageLayout>
      <HelloWave />
      <APITest />
      <ThemeTest />
    </ThemedPageLayout>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
