import {
  ThemeProvider as RThemeProvider,
  useTheme as useRTheme,
} from "@shopify/restyle";
import React, { FC, PropsWithChildren } from "react";
import { darktheme, lightTheme, Theme } from "./appTheme";
import { useUserPreferences } from "@/lib/global-store";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    userPreferences: { theme: themeName },
  } = useUserPreferences();
  return (
    <RThemeProvider theme={themeName === "dark" ? darktheme : lightTheme}>
      {children}
    </RThemeProvider>
  );
};

export const useTheme = () => {
  const theme = useRTheme<Theme>();
  return theme;
};
