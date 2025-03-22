import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, ImageViewer, Text } from "@/components";
import SearchTrip from "./SearchTrip";
import { useTheme } from "@/lib/theme";
import Color from "color";
import QRCode from "react-native-qrcode-svg";
import { BASE_URL, websocketBaseUrl } from "@/constants";
import { io, Socket } from "socket.io-client";
import { Route, Stage } from "@/features/admin/types";
import { showSnackbar } from "@/lib/overlays";

const TripSummarycard = () => {
  const [currentLocation, setCurrentLocation] = useState<string>();
  const [nextLocation, setNextLocation] = useState<string>();
  const [routeName, setRouteName] = useState<string>();
  const theme = useTheme();
  const [fleetNo, setFleetNo] = useState<string>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(
    function didMount() {
      if (fleetNo) {
        socket?.disconnect();
        const socketInstance = io(`${BASE_URL}${websocketBaseUrl}/fleet`, {
          reconnectionDelayMax: 10000,
        });
        setSocket(socketInstance); // Store socket instance in state
        socketInstance.io.on("open", () => setConnected(true));
        socketInstance.io.on("close", () => {
          setRouteName(undefined);
          setCurrentLocation(undefined);
          setNextLocation(undefined);
          setConnected(false);
        });

        socketInstance.emit("join", fleetNo.toUpperCase());
        socketInstance.on("join", (fleetNo: string) => {
          showSnackbar({
            kind: "success",
            title: "Success",
            subtitle: "Succesfully connected to fleet " + fleetNo,
          });
          socketInstance.on(
            "stream_movement",
            (routeName: string, currStage: string, nextStage: string) => {
              setRouteName(routeName);
              setCurrentLocation(currStage);
              setNextLocation(nextStage);
            }
          );
        });
        return function didUnmount() {
          socketInstance.disconnect();
          socketInstance.removeAllListeners();
        };
      }
    },
    [fleetNo]
  );
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
        <Box
          position={"absolute"}
          top={theme.spacing.m}
          right={theme.spacing.m}
          flexDirection={"row"}
          alignItems={"center"}
          gap={"s"}
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
