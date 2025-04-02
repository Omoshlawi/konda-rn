import {
  Box,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  Text,
  When,
} from "@/components";
import { useFleetRoutes, useFleets } from "@/features/admin/hooks";
import { useTheme } from "@/lib/theme";
import Color from "color";
import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useFleetInterstageMovementStream } from "../hooks";

type Props = {
  fleetNo: string;
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
  const { connected, currentStage, nextStage, currentRoute, socketRef } =
    useFleetInterstageMovementStream(fleetNo);
  const theme = useTheme();
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
          if (!data.length && !data[0]?.route?.stages?.length)
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
              <Box
                gap={"m"}
                style={{
                  backgroundColor: Color(
                    connected ? theme.colors.success : theme.colors.error
                  )
                    .alpha(0.2)
                    .toString(),
                }}
                p={"m"}
              >
                <Text
                  variant={"titleLarge"}
                  textAlign={"center"}
                  fontWeight={"700"}
                  color={"primary"}
                >
                  {activeFleetRoute?.route?.name}
                </Text>
                <Text
                  textAlign={"center"}
                  fontWeight={"700"}
                  color={"hintColor"}
                >
                  {fleetNo}
                  {currentRoute?.name && `(${currentStage?.name})`}
                </Text>
              </Box>
              <FlatList
                data={stagesInOrder ?? []}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <ListTile
                    containerStyles={{
                      backgroundColor:
                        currentStage?.id === item.stageId
                          ? theme.colors.primary
                          : undefined,
                    }}
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
