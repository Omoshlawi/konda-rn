import { ExpoIconComponent } from "@/components";
import { DrawerProfileInfo } from "@/features/settings";
import { useTheme } from "@/lib/theme";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Color from "color";
import { router, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const theme = useTheme();
  const pathname = usePathname();
  const activeColor = useMemo(
    () => Color(theme.colors.primary).alpha(0.2).toString(),
    [theme.colors.primary]
  );
  return (
    <DrawerContentScrollView {...props}>
      <DrawerProfileInfo />
      <DrawerItem
        activeTintColor={theme.colors.primary}
        inactiveTintColor={theme.colors.text}
        pressColor={theme.colors.skeleton}
        label={"Home"}
        icon={({ color, focused }) => (
          <ExpoIconComponent
            family="Ionicons"
            name={focused ? "home" : "home-outline"}
            color={color}
            size={28}
          />
        )}
        style={{
          backgroundColor:
            pathname === "/home" ? activeColor : theme.colors.background,
        }}
        onPress={() => router.push("/(drawer)/(tabs)/home")}
      />
      <DrawerItem
        activeTintColor={theme.colors.primary}
        inactiveTintColor={theme.colors.text}
        pressColor={theme.colors.skeleton}
        label={"Notification"}
        icon={({ color, focused }) => (
          <ExpoIconComponent
            family="FontAwesome"
            name={focused ? "bell" : "bell-o"}
            color={color}
            size={28}
          />
        )}
        style={{
          backgroundColor:
            pathname === "/notifications"
              ? activeColor
              : theme.colors.background,
        }}
        onPress={() => router.push("/(drawer)/notifications")}
      />
      <DrawerItem
        activeTintColor={theme.colors.primary}
        inactiveTintColor={theme.colors.text}
        pressColor={theme.colors.skeleton}
        label={"Admin"}
        icon={({ color, focused }) => (
          <ExpoIconComponent
            family="Ionicons"
            name={focused ? "shield-checkmark" : "shield-checkmark-outline"}
            color={color}
            size={28}
          />
        )}
        style={{
          backgroundColor:
            pathname === "/admin" ? activeColor : theme.colors.background,
        }}
        onPress={() => router.push("/(drawer)/admin")}
      />
    </DrawerContentScrollView>
  );
};

const Drawerlayout = () => {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: theme.colors.primary,
          drawerStyle: { backgroundColor: theme.colors.background },
          drawerLabelStyle: { color: theme.colors.text },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          // headerTitle: "",
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Drawerlayout;
