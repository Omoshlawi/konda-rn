import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { ApiConfigProvider } from "@/lib/api";
import { useUserPreferenceStore } from "@/lib/global-store";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { ThemeProvider } from "@/lib/theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const theme = useUserPreferenceStore((state) => state.userPreferences.theme); // Contains also system

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ApiConfigProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={theme == "dark" ? "light" : "dark"} />
      </ApiConfigProvider>
    </ThemeProvider>
  );
}
