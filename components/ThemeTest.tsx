import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useUserPreferenceStore } from "@/lib/global-store";
import { Switch } from "react-native";

const ThemeTest = () => {
  const theme = useUserPreferenceStore((state) => state.userPreferences.theme); // Contains also system
  const setTheme = useUserPreferenceStore((state) => state.setTheme);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);
  return (
    <View>
      <Text style={{ color: "white" }}>ThemeTest: {theme}</Text>
      <Switch value={theme === "dark"} onValueChange={toggleTheme} />
    </View>
  );
};

export default ThemeTest;

const styles = StyleSheet.create({});
