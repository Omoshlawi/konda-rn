import { create } from "zustand";
import { ThemeName, UserPreference } from "../types";

type UserPreferencestore = {
  userPreferences: UserPreference;
  setUserPreferences: (preferences: UserPreference) => void;
  setTheme: (theme: ThemeName) => void;
};

const defaultSettings: UserPreference = {
  theme: "system",
};

export const useUserPreferenceStore = create<UserPreferencestore>((set) => ({
  userPreferences: defaultSettings,
  setUserPreferences: (preference: UserPreference) =>
    set((state) => ({ ...state, userPreferences: preference })),
  setTheme: (theme: ThemeName) =>
    set((state) => ({
      ...state,
      userPreferences: { ...state.userPreferences, theme: theme },
    })),
}));
