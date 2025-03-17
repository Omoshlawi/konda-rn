import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box } from "@/components";
import SearchTrip from "./SearchTrip";

const TripSummarycard = () => {
  return (
    <Box gap={"s"} mt={"m"}>
      <SearchTrip />
      <Box
        borderRadius={"large"}
        backgroundColor={"primary"}
        height={100}
        width={"100%"}
      ></Box>
    </Box>
  );
};

export default TripSummarycard;

const styles = StyleSheet.create({});
