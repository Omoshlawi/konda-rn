import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useLoadInitialAuthState } from "@/features/auth/hooks";
import { ApiConfigProvider } from "@/lib/api";
import { useUserPreferedTheme } from "@/lib/global-store";
import { OverlayPortal } from "@/lib/overlays";
import { ThemeProvider } from "@/lib/theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const theme = useUserPreferedTheme();
  const { isLoading } = useLoadInitialAuthState();

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  if (!loaded || isLoading) {
    return null;
  }

  return (
    <ThemeProvider>
      <ApiConfigProvider>
        <OverlayPortal>
          <StatusBar style={theme == "dark" ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(drawer)" />
            <Stack.Screen name="admin" />
            <Stack.Screen name="(trip)" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="(authentication)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </OverlayPortal>
      </ApiConfigProvider>
    </ThemeProvider>
  );
}
