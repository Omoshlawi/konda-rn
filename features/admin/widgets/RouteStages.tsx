import {
  Box,
  EmptyState,
  ErrorState,
  ListTile,
  ListTileSkeleton,
  Text,
  When,
} from "@/components";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { useRouteStages } from "../hooks";
import { Route } from "../types";

type Props = {
  route: Route;
};

const Routestages: FC<Props> = ({ route }) => {
  const asyncRouteStages = useRouteStages(route.id);
  return (
    <When
      asyncState={{ ...asyncRouteStages, data: asyncRouteStages.routeStages }}
      error={(err) => (
        <Box height={400}>
          <ErrorState error={err} />
        </Box>
      )}
      loading={() => (
        <Box gap={"s"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <ListTileSkeleton key={index} />
          ))}
        </Box>
      )}
      success={(routestages) => {
        if (!routestages.length)
          return (
            <Box height={400}>
              <EmptyState message="No stages" />
            </Box>
          );
        return (
          <Box mt={"m"} gap={"s"}>
            <Text fontWeight={"700"} color={"text"}>
              Stages
            </Text>
            {routestages.map((routeStage) => (
              <ListTile
                key={routeStage.id}
                title={routeStage.stage?.name ?? "Hello"}
                subtitle={`${routeStage?.stage?.county?.name}, ${routeStage?.stage?.subCounty?.name}`}
                borderBottom
              />
            ))}
          </Box>
        );
      }}
    />
  );
};

export default Routestages;

const styles = StyleSheet.create({});
