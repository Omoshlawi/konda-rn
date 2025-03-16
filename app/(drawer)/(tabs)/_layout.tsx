import { Tabs } from "expo-router";
import React from "react";

import { ExpoIconComponent } from "@/components";
import { useTheme } from "@/lib/theme";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <ExpoIconComponent
              family="Ionicons"
              name={focused ? "home" : "home-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cmd"
        options={{
          title: "CMD",
          tabBarIcon: ({ color, focused }) => (
            <ExpoIconComponent
              family="Ionicons"
              name={focused ? "terminal" : "terminal-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <ExpoIconComponent
              family="Ionicons"
              name={focused ? "cog" : "cog-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
