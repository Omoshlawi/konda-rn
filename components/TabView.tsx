import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { TabView as RNTabView, SceneMap, TabBar } from "react-native-tab-view";
import Text from "./Text";
import { useTheme } from "@/lib/theme";
type Route = {
  key: string;
  title: string;
  icon?: React.ReactNode;
  badgeCount?: number;
};

type RenderIconProps = {
  route: Route;
  focused: boolean;
  color: string;
};

type TabViewProps = {
  routes: Route[];
  scenes: { [key: string]: React.ComponentType<any> };
  tabBarStyle?: StyleProp<ViewStyle>;
  tabBarLabelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  renderIcon?: (props: RenderIconProps) => React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
  pressColor?: string;
  renderBadge?: (route: Route) => React.ReactNode;
  renderLabel?: (props: {
    route: Route;
    focused: boolean;
    color: string;
  }) => React.ReactNode;
  renderTabBar?: (props: any) => React.ReactNode;
  onIndexChange?: (index: number) => void;
};

const TabView: React.FC<TabViewProps> = ({
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
  renderTabBar: customRenderTabBar,
  onIndexChange,
}) => {
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

  const defaultRenderIcon = ({ route, focused, color }: RenderIconProps) => {
    if (route.icon) {
      return (
        <View style={styles.iconContainer}>
          {React.isValidElement(route.icon)
            ? React.cloneElement(route.icon as React.ReactElement, { color })
            : route.icon}
        </View>
      );
    }
    return null;
  };

  const defaultRenderLabel = ({
    route,
    focused,
    color,
  }: {
    route: Route;
    focused: boolean;
    color: string;
  }) => (
    <View style={styles.labelContainer}>
      {renderLabel ? (
        renderLabel({ route, focused, color })
      ) : (
        <View>
          {route.title && (
            <View style={styles.titleContainer}>
              <View style={styles.title}>
                {typeof route.title === "string" ? (
                  <Text style={[styles.label, tabBarLabelStyle, { color }]}>
                    {route.title}
                  </Text>
                ) : (
                  route.title
                )}
              </View>
              {renderBadge && renderBadge(route)}
            </View>
          )}
        </View>
      )}
    </View>
  );

  const renderTabBar =
    customRenderTabBar ||
    ((props: any) => (
      <TabBar
        {...props}
        style={[
          styles.tabBar,
          { backgroundColor: theme.colors.background },
          tabBarStyle,
        ]}
        renderIcon={renderIcon || defaultRenderIcon}
        renderLabel={defaultRenderLabel}
        indicatorStyle={[
          styles.indicator,
          { backgroundColor: theme.colors.primary },
          indicatorStyle,
        ]}
        activeColor={defaultActiveColor}
        inactiveColor={defaultInactiveColor}
        pressColor={defaultPressColor}
      />
    ));

  return (
    <RNTabView
      navigationState={{
        index,
        routes: routes.map((r) => ({ key: r.key, title: r.title })),
      }}
      renderScene={SceneMap(scenes)}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
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
