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
import { useEffect, useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const theme = useTheme();
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
        onPress={() => router.push("/(drawer)/(tabs)")}
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
        onPress={() => router.push("/notifications")}
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
        onPress={() => router.push("/admin")}
      />
    </DrawerContentScrollView>
  );
};

const Drawerlayout = () => {
  const theme = useTheme();
  const rawPathname = usePathname();
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    setPathname(rawPathname);
  }, [rawPathname]);
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
          headerShown: pathname === "/",
          headerTitle: "",
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Home",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Drawerlayout;
