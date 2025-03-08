import { StyleSheet } from "react-native";

import { ThemedPageLayout } from "@/components";
import { HelloWave } from "@/components/HelloWave";
import APITest from "@/lib/api/APITest";

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
