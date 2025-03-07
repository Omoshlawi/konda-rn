import { useUserPreferences } from "@/lib/global-store";
import { FC, PropsWithChildren } from "react";

import { Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "./Box";

interface Props extends PropsWithChildren {
  withSafeArea?: boolean;
  backgroundColor?: string;
}

export const ThemedPageLayout: FC<Props> = ({
  children,
  withSafeArea = true,
  backgroundColor,
}) => {
  const {
    userPreferences: { theme },
    setTheme,
  } = useUserPreferences();
  return (
    <Box
      backgroundColor={"background"}
      flex={1}
      height={"100%"}
      flexGrow={1}
      flexDirection={"column"}
      style={[backgroundColor && { backgroundColor }]}
    >
      {withSafeArea && (
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      )}
      {!withSafeArea && children}
      <Switch
        style={{ position: "absolute", bottom: 40, right: 40 }}
        value={theme === "dark"}
        onValueChange={(enabled) => setTheme(enabled ? "dark" : "light")}
      />
    </Box>
  );
};
