import {
  StyleSheet,
  Image,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";

import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";

import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  Box,
  DateTimePickerInput,
  IconButton,
  ThemedPageLayout,
} from "@/components";
import { showDialog, showModal, showModalBottomSheet } from "@/lib/overlays";
import React from "react";

export default function TabTwoScreen() {
  const handleShowBottomsheet = (number: number) => {
    showModalBottomSheet(
      <React.Fragment>
        <Text>Bottomsheet - {number}</Text>
        <TouchableOpacity onPress={() => handleShowBottomsheet(number + 1)}>
          <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
            <Text>Bottomsheet</Text>
          </Box>
        </TouchableOpacity>
      </React.Fragment>,
      {}
    );
  };
  return (
    <ThemedPageLayout>
      <ExternalLink href="https://docs.expo.dev/router/introduction">
        <Text>Learn more</Text>
      </ExternalLink>
      <DateTimePickerInput label="date" mode="date" />
      <DateTimePickerInput label="datetime" mode="datetime" />
      <DateTimePickerInput label="time" mode="time" />
      <TouchableOpacity onPress={() => showDialog(<Text>Dialog</Text>)}>
        <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
          <Text>Dialog</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showModal(<Text>Modal</Text>)}>
        <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
          <Text>Modal</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleShowBottomsheet(1)}>
        <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
          <Text>Bottomsheet</Text>
        </Box>
      </TouchableOpacity>
      <IconButton
        onPress={() => {}}
        variant="filled"
        icon={{ family: "FontAwesome", name: "star" }}
        color="red"
      />
      <IconButton
        onPress={() => {}}
        variant="outline"
        icon={{ family: "FontAwesome", name: "star" }}
        color="red"
      />
      <IconButton
        onPress={() => {}}
        variant="tonal"
        icon={{ family: "FontAwesome", name: "star" }}
        color="red"
      />
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
