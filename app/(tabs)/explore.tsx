import { StyleSheet, Image, Platform, Text } from "react-native";

import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedPageLayout } from "@/components";

export default function TabTwoScreen() {
  return (
    <ThemedPageLayout>
      <ExternalLink href="https://docs.expo.dev/router/introduction">
        <Text>Learn more</Text>
      </ExternalLink>
    </ThemedPageLayout>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
