import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "@/lib/theme";
import { ExpoIconComponent } from "@/components";

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
    >
      {/* <Tabs.Screen
          name="dashboard"
          options={{
            href: currentOrganization ? "/(tabs)/dashboard" : null,
            title: "Menu",
            tabBarIcon: ({ color, focused }) => (
              <StyledTabBarIcon
                name={focused ? "view-dashboard" : "view-dashboard-outline"}
                color={color}
              />
            ),
          }}
        /> */}
      <Tabs.Screen
        name="home"
        options={{
          href: "/(tabs)/home",
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
          href: "/(tabs)/cmd",
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

      {/* <Tabs.Screen
        name="pay"
        options={{
          href: null,
          title: "Pay",
          tabBarIcon: ({ color, focused }) => (
            <StyledTabBarIcon
              name={focused ? "plus-circle" : "plus-circle-outline"}
              color={color}
            />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="support"
        options={{
          href: null,
          title: "Support",
          tabBarIcon: ({ color, focused }) => (
            <StyledTabBarIcon
              name={focused ? "chat" : "chat-outline"}
              color={color}
            />
          ),
        }}
      /> */}
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
