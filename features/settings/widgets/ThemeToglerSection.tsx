import { ExpoIconComponent, ListTile, SectionCard } from "@/components";
import { ThemeName, useUserPreferenceStore } from "@/lib/global-store";
import { StyleSheet, Switch } from "react-native";

export const ThemeTogglerSection = () => {
  const theme = useUserPreferenceStore((state) => state.userPreferences.theme); // Contains also system
  const setTheme = useUserPreferenceStore((state) => state.setTheme);
  const handleChangeTheme = (checked: boolean, theme: ThemeName) => {
    if (checked) {
      setTheme(theme);
    }
  };
  return (
    <SectionCard title="Theme">
      <ListTile
        title="System"
        subtitle="Uses system theme"
        leading={<ExpoIconComponent family="Entypo" name="cog" />}
        trailing={
          <Switch
            value={theme === "system"}
            onValueChange={(checked) => handleChangeTheme(checked, "system")}
          />
        }
      />

      <ListTile
        title="Light"
        subtitle="Uses app light theme"
        leading={<ExpoIconComponent family="Entypo" name="light-down" />}
        trailing={
          <Switch
            value={theme === "light"}
            onValueChange={(checked) => handleChangeTheme(checked, "light")}
          />
        }
      />

      <ListTile
        title="Dark"
        subtitle="Uses app dark theme"
        leading={<ExpoIconComponent family="Entypo" name="moon" />}
        trailing={
          <Switch
            value={theme === "dark"}
            onValueChange={(checked) => handleChangeTheme(checked, "dark")}
          />
        }
      />
    </SectionCard>
  );
};

const styles = StyleSheet.create({
  lastListItem: {
    marginTop: 16,
  },
});
