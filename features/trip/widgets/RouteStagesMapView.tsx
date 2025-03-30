import { StyleSheet } from "react-native";
import React, { FC } from "react";
import {
  Box,
  EmptyState,
  ErrorState,
  ListTileSkeleton,
  When,
  Text,
} from "@/components";
import { useFleetRoutes, useFleets } from "@/features/admin/hooks";
type Props = {
  fleetNo: String;
};

const RouteStagesMapView: FC<Props> = ({ fleetNo }) => {
  const {
    fleets,
    isLoading: isFleetsLoading,
    error: fleetsErros,
  } = useFleets({ name: fleetNo });
  const stagesAsync = useFleetRoutes(fleets[0]?.id, {
    includeOnlyActiveFleetRoutes: "true",
    v: "custom:include(fleet,route:include(stages:include(stage)))",
  });
  return (
    <Box flex={1} gap={"m"}>
      <When
        asyncState={{
          isLoading: stagesAsync.isLoading || isFleetsLoading,
          error: fleetsErros ?? stagesAsync.error,
          data: stagesAsync.fleetRoutes,
        }}
        loading={() => (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ListTileSkeleton key={index} />
            ))}
          </>
        )}
        error={(err) => <ErrorState error={err} />}
        success={(data) => {
          if (!data.length && !data[0].route?.stages?.length)
            return (
              <EmptyState
                message={"No active fleet routes for fleet " + fleetNo}
              />
            );
          const activeFleetRoute = data[0];
          const stagesInOrder = activeFleetRoute?.route?.stages?.sort(
            (a, b) => a.order - b.order
          );
          return <></>;
        }}
      />
    </Box>
  );
};

export default RouteStagesMapView;

const styles = StyleSheet.create({});
