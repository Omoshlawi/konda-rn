import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Route } from "../types";
import { Box, ExpoIconComponent, TabView, Text } from "@/components";
import RouteStages from "./RouteStages";

type Props = {
  route: Route;
};

const RoutePricingAndStagesTabs: FC<Props> = ({ route }) => {
  return (
    <Box height={400}>
      <TabView
        routes={[
          { title: "Stages", key: "stages" },
          { title: "Pricing", key: "pricing" },
        ]}
        renderIcon={({ route: {} }) => (
          <ExpoIconComponent family="FontAwesome" name="star" />
        )}
        scenes={{
          stages: () => (
            <Box style={{ flex: 1 }}>
              <Box>
                <Text
                  color={"text"}
                >{`Estimate Distance: ${route.distanceKm} km`}</Text>
                <Text
                  color={"text"}
                >{`estimate Duration: ${route.estimatedTimeMin} mins`}</Text>
              </Box>
              <RouteStages route={route} />
            </Box>
          ),
          pricing: () => (
            <>
              <Box>
                <Text
                  color={"text"}
                >{`Estimate Distance: ${route.distanceKm} km`}</Text>
                <Text
                  color={"text"}
                >{`estimate Duration: ${route.estimatedTimeMin} mins`}</Text>
              </Box>
              <RouteStages route={route} />
            </>
          ),
        }}
      />
    </Box>
  );
};

export default RoutePricingAndStagesTabs;

const styles = StyleSheet.create({});
