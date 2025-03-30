import { FlatList, StyleSheet } from "react-native";
import React, { FC } from "react";
import {
  Box,
  ErrorState,
  ListTileSkeleton,
  When,
  Text,
  EmptyState,
  ListTile,
  ExpoIconComponent,
} from "@/components";
import { useFleetRoutes, useFleets, useStages } from "@/features/admin/hooks";

type Props = {
  fleetNo: String;
};

const RouteStagesListingView: FC<Props> = ({ fleetNo }) => {
  const {
    fleets,
    isLoading: isFleetsLoading,
    error: fleetsErros,
  } = useFleets({ name: fleetNo });
  const stagesAsync = useFleetRoutes(fleets[0]?.id, {
    includeOnlyActiveFleetRoutes: "true",
    v: "custom:include(fleet,route:include(stages:include(stage:include(county,subCounty))))",
  });
  return (
    <Box flex={1} gap={"m"} p={"m"}>
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
          return (
            <>
              <Text
                variant={"titleLarge"}
                textAlign={"center"}
                fontWeight={"700"}
                color={"primary"}
              >
                {activeFleetRoute.route?.name}
              </Text>
              <Text
                textAlign={"center"}
                fontWeight={"700"}
                color={"hintColor"}
                mb={"s"}
              >
                {fleetNo}
              </Text>
              <FlatList
                data={stagesInOrder ?? []}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <ListTile
                    title={`${item.order}. ${item?.stage?.name}`}
                    leading={
                      <ExpoIconComponent family="FontAwesome6" name="bus" />
                    }
                    subtitle={`${item.stage?.county?.name}, ${item.stage?.subCounty?.name}`}
                    borderBottom
                  />
                )}
              />
            </>
          );
        }}
      />
    </Box>
  );
};

export default RouteStagesListingView;

const styles = StyleSheet.create({});
