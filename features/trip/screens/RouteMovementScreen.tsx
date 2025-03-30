import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import {
  AppBar,
  Box,
  ExpoIcon,
  ExpoIconComponent,
  TabView,
  ThemedPageLayout,
} from "@/components";
import { useLocalSearchParams } from "expo-router";
import { RouteStagesListingView, RouteStagesMapView } from "../widgets";

type TabBarData = {
  key: "list" | "map";
  title: string;
  icon: ExpoIcon;
};

const RouteMovementScreen = () => {
  const params = useLocalSearchParams<{ fleetNo: string }>();

  return (
    <ThemedPageLayout>
      <AppBar title={params.fleetNo} />
      <TabView<TabBarData>
        routes={[
          {
            key: "list",
            title: "List view",
            icon: { family: "FontAwesome6", name: "list" },
          },
          {
            key: "map",
            title: "Map view",
            icon: { family: "FontAwesome6", name: "map-location-dot" },
          },
        ]}
        renderIcon={({ route: { icon }, color }) => (
          <ExpoIconComponent size={20} color={color} {...icon} />
        )}
        scenes={{
          list: () => <RouteStagesListingView fleetNo={params.fleetNo} />,
          map: () => <RouteStagesMapView fleetNo={params.fleetNo}/>,
        }}
      />
    </ThemedPageLayout>
  );
};

export default RouteMovementScreen;

const styles = StyleSheet.create({});
