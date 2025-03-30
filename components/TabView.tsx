import { useTheme } from "@/lib/theme";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import {
  TabView as RNTabView,
  Route,
  SceneMap,
  TabBar,
} from "react-native-tab-view";

type RenderIconProps<T> = {
  route: T;
  focused: boolean;
  color: string;
  size: number;
};

type RenderBadgeProps<T> = {
  route: T;
};

type RenderLabelProps<T> = {
  route: T;
  labelText?: string;
  focused: boolean;
  color: string;
  allowFontScaling?: boolean;
  style?: StyleProp<TextStyle>;
};

type TabViewProps<T> = {
  routes: T[];
  scenes: { [key: string]: React.ComponentType<any> };
  tabBarStyle?: StyleProp<ViewStyle>;
  tabBarLabelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  renderIcon?: (props: RenderIconProps<T>) => React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
  pressColor?: string;
  renderBadge?: (route: RenderBadgeProps<T>) => React.ReactElement;
  renderLabel?: (props: RenderLabelProps<T>) => React.ReactNode;
  onIndexChange?: (index: number) => void;
  accessibilityLabel?: string;
};

const TabView = <
  T extends Pick<
    Route,
    "accessibilityLabel" | "accessible" | "key" | "testID" | "title"
  >
>({
  routes = [],
  scenes,
  tabBarStyle,
  tabBarLabelStyle,
  indicatorStyle,
  renderIcon,
  activeColor,
  inactiveColor,
  pressColor,
  renderBadge,
  renderLabel,
  onIndexChange,
  accessibilityLabel,
}: TabViewProps<T>) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const theme = useTheme();
  const defaultActiveColor = activeColor ?? theme.colors.primary;
  const defaultInactiveColor = inactiveColor ?? theme.colors.hintColor;
  const defaultPressColor = pressColor ?? "#e4e4e4";
  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  return (
    <RNTabView<T>
      navigationState={{
        index,
        routes,
      }}
      renderScene={SceneMap(scenes)}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar<T>
          {...props}
          style={[
            styles.tabBar,
            { backgroundColor: theme.colors.background },
            tabBarStyle,
          ]}
          indicatorStyle={[
            styles.indicator,
            { backgroundColor: theme.colors.primary },
            indicatorStyle,
          ]}
          activeColor={defaultActiveColor}
          inactiveColor={defaultInactiveColor}
          pressColor={defaultPressColor}
          
        />
      )}
      commonOptions={{
        icon: renderIcon,
        badge: renderBadge,
        accessible: true,
        accessibilityLabel,
        label: renderLabel,
      }}
      lazy
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    boxShadow: "none",
  },
  label: {
    textTransform: "none",
    fontWeight: "600",
    fontSize: 14,
  },
  indicator: {
    backgroundColor: "#000",
  },
  iconContainer: {
    marginBottom: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TabView;
