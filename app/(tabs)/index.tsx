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
      <Button title="Btn tertiary" variant="tertiary" />
      <SectionCard title="Section">
        <ListTile
          leading={<ExpoIconComponent family="FontAwesome" name="star" />}
          title="Listtile"
          subtitle="Some subtitle for the list tile goes here no matter the length"
          borderBottom
        />
      </SectionCard>
      <ExpansionTile
        title="Expansion Tile"
        subtitle="Some subtitle for the expansion tile goes hre as well"
      >
        <Text color={"text"}>
          Some text here representing expansion tile childrem
        </Text>
      </ExpansionTile>
      <TextInput
        label="Label"
        placeholder="Placeholder"
        prefixIcon={<ExpoIconComponent family="FontAwesome" name="star" />}
      />
      <InputSkeleton />
      <ListTileSkeleton />
      <IconButton icon={{ family: "FontAwesome", name: "star" }} />
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
