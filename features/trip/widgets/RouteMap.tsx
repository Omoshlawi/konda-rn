import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { FleetRoute } from "@/features/admin/types";
import MapView, { Marker } from "react-native-maps";
import { useFleetGPSStream } from "../hooks";
import { ImageViewer } from "@/components";

type Props = {
  fleetRoute: FleetRoute;
  fleetNo: string;
};

const RouteMap: FC<Props> = ({ fleetRoute, fleetNo }) => {
  const mapRef = useRef<MapView>(null);
  const stagesInOrder = useMemo(
    () => (fleetRoute.route?.stages ?? [])?.sort((a, b) => a.order - b.order),
    [fleetRoute]
  );
  const {  currentLocation } = useFleetGPSStream(fleetNo);
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
    <MapView style={styles.map} ref={mapRef}>
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
