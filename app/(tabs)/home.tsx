import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import APITest from "@/lib/api/APITest";
import {
  Button,
  ExpansionTile,
  ExpoIconComponent,
  IconButton,
  InputSkeleton,
  ListTile,
  ListTileSkeleton,
  SectionCard,
  Text,
  TextInput,
  ThemedPageLayout,
} from "@/components";

export default function HomeScreen() {
  return (
    <ThemedPageLayout>
      <HelloWave />
      <APITest />
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
