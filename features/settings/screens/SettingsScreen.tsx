import { Linking, Platform, ScrollView, StyleSheet } from "react-native";

import {
  AppBar,
  Box,
  ExpoIconComponent,
  ListTile,
  SectionCard,
  ThemedPageLayout,
} from "@/components";

import { useSession } from "@/lib/global-store";
import { ThemeTogglerSection } from "../widgets";
import { LogoutSection } from "@/features/auth/widgets";

export const SettingsScreen = () => {
  const { user } = useSession();
  return (
    <ThemedPageLayout>
      <AppBar title="Settings" leading={false} />
      <ScrollView>
        <Box p={"m"} flex={1} flexDirection={"column"} gap={"m"}>
          <SectionCard title="Account">
            <ListTile
              title={user?.person.name ?? user?.username}
              subtitle={user?.person?.email}
              leading={<ExpoIconComponent family="Feather" name="user" />}
              onPress={() => {}}
              trailing={
                <ExpoIconComponent
                  family="MaterialCommunityIcons"
                  name="chevron-right"
                />
              }
            />
            <ListTile
              title="Change password"
              leading={<ExpoIconComponent family="Feather" name="key" />}
              subtitle="Use string secure password"
              trailing={
                <ExpoIconComponent
                  family="MaterialCommunityIcons"
                  name="chevron-right"
                />
              }
            />
          </SectionCard>
          <SectionCard title="Notifications">
            <ListTile
              title={"Notification settings"}
              subtitle={"default"}
              leading={
                <ExpoIconComponent
                  family="MaterialCommunityIcons"
                  name="bell"
                />
              }
              onPress={() => {
                if (Platform.OS === "android") {
                  Linking.openSettings(); // Opens app-specific settings
                } else {
                  // For iOS, there's no direct way to open notification sound settings
                  Linking.openURL("app-settings:");
                }
              }}
              trailing={
                <ExpoIconComponent
                  family="MaterialCommunityIcons"
                  name="chevron-right"
                />
              }
            />
          </SectionCard>
          <ThemeTogglerSection />
          <LogoutSection />
        </Box>
      </ScrollView>
    </ThemedPageLayout>
  );
};

const styles = StyleSheet.create({});
