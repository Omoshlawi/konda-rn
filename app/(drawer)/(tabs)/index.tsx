import { ScrollView, StyleSheet } from "react-native";

import { Box, IconButton, Text, ThemedPageLayout } from "@/components";
import { TripSummaryCard } from "@/features/trip/widgets";
import { useTheme } from "@/lib/theme";
import { router, useNavigation } from "expo-router";

export default function HomeScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <ThemedPageLayout>
      <Box
        width={"100%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        p={"m"}
        alignItems={"center"}
        style={{
          shadowColor: theme.colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <IconButton
          icon={{ family: "FontAwesome", name: "align-left" }}
          variant="ghost"
          size={20}
          color={theme.colors.primary}
          containerStyle={{ alignSelf: "center" }}
          onPress={() => {
            (navigation as any).openDrawer();
          }}
        />
        <IconButton
          icon={{ family: "FontAwesome", name: "bell-o" }}
          variant="tonal"
          size={20}
          color={theme.colors.primary}
          containerStyle={{ alignSelf: "center" }}
          onPress={() => {
            router.navigate("/notifications");
          }}
        />
      </Box>
      <Box px={"l"}>
        <Text variant={"titleLarge"} fontWeight={"700"} color={"text"}>
          Welcome, {"Guest User"}
        </Text>
        <Text color={"hintColor"} variant={"titleMedium"}>
          {new Date().toDateString()}
        </Text>
      </Box>
      <Box px={"l"}>
        <ScrollView>
          <Box gap={"m"} mt={"l"}>
            <TripSummaryCard />
          </Box>
        </ScrollView>
      </Box>
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
