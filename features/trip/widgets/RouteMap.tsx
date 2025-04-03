import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { FleetRoute } from "@/features/admin/types";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { useFleetGPSStream } from "../hooks";
import { ImageViewer } from "@/components";
import { useUserPreferedTheme } from "@/lib/global-store";

type Props = {
  fleetRoute: FleetRoute;
  fleetNo: string;
};

const RouteMap: FC<Props> = ({ fleetRoute, fleetNo }) => {
  const mapRef = useRef<MapView>(null);
  const theme = useUserPreferedTheme();
  const stagesInOrder = useMemo(
    () => (fleetRoute.route?.stages ?? [])?.sort((a, b) => a.order - b.order),
    [fleetRoute]
  );
  const { currentLocation } = useFleetGPSStream(fleetNo);
  const points = useMemo<Array<{ latitude: number; longitude: number }>>(
    () =>
      stagesInOrder.length > 0
        ? stagesInOrder.map(({ stage }) => ({
            latitude: Number(stage?.latitude) || 0, // Ensure valid latitude
            longitude: Number(stage?.longitude) || 0, // Ensure valid longitude
          }))
        : [],
    [stagesInOrder]
  );
  useEffect(() => {
    if (mapRef.current && points.length > 1) {
      mapRef.current.fitToCoordinates(points, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [points]);

  return (
    <MapView
      style={styles.map}
      ref={mapRef}
      customMapStyle={
        /*theme === "dark" ? darkMapStyle : lightMapStyle*/ minimalMapStyle
      }
    >
      <UrlTile
        // urlTemplate={"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        // urlTemplate={"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        urlTemplate={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        // urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />
      {stagesInOrder?.map((stage, index) => (
        <Marker
          key={index}
          coordinate={points[index]}
          title={`${stage.order + 1}. ${stage.stage?.name || "Unknown Stage"}`}
          description={`${stage.stage?.county?.name || "Unknown County"}, ${
            stage.stage?.subCounty?.name || "Unknown Subcounty"
          }`}
        >
          <ImageViewer
            source={require("@/assets/images/stage.png")}
            style={styles.marker}
            contentFit="contain"
          />
        </Marker>
      ))}
      {currentLocation && (
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title={`Current location`}
          description={`Current location`}
        >
          <ImageViewer
            source={require("@/assets/images/marker.png")}
            style={styles.marker}
            contentFit="contain"
          />
        </Marker>
      )}
    </MapView>
  );
};

export default RouteMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    height: 60,
    width: 60,
  },
});

const minimalMapStyle = [
  { featureType: "poi", stylers: [{ visibility: "off" }] }, // Hide Points of Interest
  { featureType: "transit", stylers: [{ visibility: "off" }] }, // Hide Public Transport
  //   { featureType: "road", stylers: [{ visibility: "simplified" }] }, // Simplify Roads
  { featureType: "administrative", stylers: [{ visibility: "off" }] }, // Hide Admin Boundaries
  //   { featureType: "landscape", stylers: [{ visibility: "simplified" }] }, // Simplify Landscapes
  //   { featureType: "water", stylers: [{ color: "#d4e4e6" }] }, // Light Blue Water
];

// Light Theme Map Style
const lightMapStyle = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ visibility: "simplified" }] },
  { featureType: "water", stylers: [{ color: "#d4e4e6" }] },
];

// Dark Theme Map Style
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { featureType: "road", stylers: [{ color: "#38414e" }] },
  { featureType: "water", stylers: [{ color: "#17263c" }] },
];
