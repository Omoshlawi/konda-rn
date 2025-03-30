import {
  Box,
  Button,
  ExpoIconComponent,
  ImageViewer,
  Text,
} from "@/components";
import { BASE_URL, websocketBaseUrl } from "@/constants";
import { showSnackbar } from "@/lib/overlays";
import { useTheme } from "@/lib/theme";
import Color from "color";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { io, Socket } from "socket.io-client";
import SearchTrip from "./SearchTrip";
import { useRouter } from "expo-router";
import { RoutePaths } from "../utils/constants";

const TripSummarycard = () => {
  const [currentLocation, setCurrentLocation] = useState<string>();
  const [nextLocation, setNextLocation] = useState<string>();
  const [routeName, setRouteName] = useState<string>();
  const theme = useTheme();
  const [fleetNo, setFleetNo] = useState<string>();
  const [connected, setConnected] = useState(false);
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only attempt connection if fleetNo exists
    if (!fleetNo) return;

    // Cleanup previous connection
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    }

    // Create new socket connection
    const socketInstance = io(`${BASE_URL}${websocketBaseUrl}/fleet`, {
      reconnectionDelayMax: 10000,
      reconnection: true,
      reconnectionAttempts: 10,
    });

    // Store socket in ref instead of state
    socketRef.current = socketInstance;

    // Connection status handlers
    socketInstance.on("connect", () => {
      setConnected(true);
      showSnackbar({
        subtitle: "Socket connected, joining room:" + fleetNo.toUpperCase(),
        kind: "info",
      });

      // Join room after connection is established
      socketInstance.emit("join", fleetNo.toUpperCase());
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
      showSnackbar({ subtitle: "Socket disconnected", kind: "info" });
    });

    // Error handling
    socketInstance.on("connect_error", (error) => {
      showSnackbar({
        title: "Connection error:",
        subtitle: error.message,
        kind: "error",
      });
      setConnected(false);
    });

    // Join confirmation handler
    socketInstance.on("join", (joinedFleetNo) => {
      showSnackbar({
        kind: "success",
        title: "Success",
        subtitle: "Successfully connected to fleet " + joinedFleetNo,
      });
    });

    // Data stream handler
    socketInstance.on("stream_movement", (routeName, currStage, nextStage) => {
      setRouteName(routeName);
      setCurrentLocation(currStage);
      setNextLocation(nextStage);
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up socket connection");
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.removeAllListeners();
        socketRef.current = null;
      }
    };
  }, [fleetNo]);
  return (
    <Box gap={"s"} mt={"m"}>
      <SearchTrip fleetNo={fleetNo} onChangeFleetNo={setFleetNo} />
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
            Current stage: {currentLocation ?? "-"}
          </Text>
          <Text
            fontWeight={"700"}
            variant={"bodySmall"}
            style={{ color: Color("white").alpha(0.6).toString() }}
          >
            Route: {routeName ?? "-"}
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
            Fleet No. {fleetNo?.toUpperCase() ?? "-"}
          </Text>
          <Text
            style={{ color: "white" }}
            fontWeight={"700"}
            variant={"bodyLarge"}
          >
            Next Stage: {nextLocation ?? "-"}
          </Text>
        </Box>
        <Button
          title="View route"
          iconLeading
          underlayColor={Color(theme.colors.primary).darken(0.1).toString()}
          renderIcon={({ size, color }) => (
            <ExpoIconComponent
              family="FontAwesome6"
              name="map-location-dot"
              size={size}
              color={"white"}
            />
          )}
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
          onPress={
            fleetNo
              ? () => {
                  router.push({
                    pathname: RoutePaths.ROUTE_MOVEMENT_SCREEN,
                    params: { fleetNo: fleetNo.toUpperCase() },
                  });
                }
              : undefined
          }
        />
        <Box
          position={"absolute"}
          top={theme.spacing.m}
          right={theme.spacing.m}
          flexDirection={"row-reverse"}
          alignItems={"center"}
          gap={"s"}
          borderRadius={"large"}
          style={{
            backgroundColor: Color("white").alpha(0.2).toString(),
            padding: theme.spacing.s * 0.75,
          }}
        >
          <Box
            width={8}
            height={8}
            backgroundColor={connected ? "success" : "error"}
          />
          <Text
            color={connected ? "success" : "error"}
            fontWeight={"bold"}
            variant={"labelSmall"}
          >
            {connected ? "Connected" : "Not Connected"}
          </Text>
        </Box>
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
