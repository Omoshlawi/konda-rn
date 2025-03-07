import { useColorScheme } from "react-native";
import { useUserPreferenceStore } from "./useUserPreferenceStore";

export const useUserPreferences = () => {
  const theme = useColorScheme(); // System theme
  const { setTheme, setUserPreferences, userPreferences } =
    useUserPreferenceStore((state) => state); // Access store

  return {
    setTheme,
    setUserPreferences,
    userPreferences: {
      ...userPreferences, // Spread the existing userPreferences object
      theme: userPreferences.theme === "system" ? theme : userPreferences.theme, // Override the theme logic
    },
  };
};

export const useUserPreferedTheme = () => {
  const theme = useColorScheme(); // System theme
  const userTtheme = useUserPreferenceStore(
    (state) => state.userPreferences.theme
  ); // Access store

  return userTtheme === "system" ? theme : userTtheme;
};
