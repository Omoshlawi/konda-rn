import { StyleSheet } from "react-native";
import React from "react";
import { Box, Button, ImageViewer, Text } from "@/components";
import SearchTrip from "./SearchTrip";
import { useTheme } from "@/lib/theme";
import Color from "color";
import QRCode from "react-native-qrcode-svg";

const TripSummarycard = () => {
  const currentLocation = "Ruiru";
  const nextLocation = "Juja";
  const routeName = "Juja - CBD";
  const fleetNumber = "SM002";
  const theme = useTheme();
  return (
    <Box gap={"s"} mt={"m"}>
      <SearchTrip />
      <Box
        borderRadius={"large"}
        backgroundColor={"primary"}
        height={200}
        width={"100%"}
        p={"m"}
        justifyContent={"space-between"}
        overflow={"hidden"}
      >
        <ImageViewer
          source={require("@/assets/images/card-bg.jpg")}
          style={styles.bg}
        />
        <Box gap={"s"}>
          <Text
            style={{ color: "white" }}
            fontWeight={"700"}
            variant={"titleLarge"}
          >
            Current stage: {currentLocation}
          </Text>
          <Text
            fontWeight={"700"}
            variant={"bodySmall"}
            style={{ color: Color("white").alpha(0.6).toString() }}
          >
            Route: {routeName}
          </Text>
        </Box>
        <QRCode
          value="http://awesome.link.qr"
          size={55}
          backgroundColor={theme.colors.primary}
          color={"white"}
        />
        <Box gap={"s"}>
          <Text
            fontWeight={"700"}
            variant={"labelSmall"}
            style={{ color: Color("white").alpha(0.6).toString() }}
            fontStyle={"italic"}
          >
            Fleet No. {fleetNumber}
          </Text>
          <Text
            style={{ color: "white" }}
            fontWeight={"700"}
            variant={"bodyLarge"}
          >
            Next Stage: {nextLocation}
          </Text>
        </Box>
        <Button
          title="Full route"
          underlayColor={Color(theme.colors.primary).darken(0.1).toString()}
          style={{
            width: "auto",
            position: "absolute",
            bottom: theme.spacing.m,
            right: theme.spacing.m,
            padding: theme.spacing.s,
            borderColor: "white",
          }}
          labelStyle={{
            ...(theme.textVariants.labelSmall as any),
            color: "white",
          }}
          variant="tertiary"
          onPress={() => {}}
        />
        <ImageViewer
          source={require("@/assets/images/card-marker.png")}
          style={[styles.img, { top: theme.spacing.s, right: theme.spacing.s }]}
        />
      </Box>
    </Box>
  );
};

export default TripSummarycard;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
  },
});
