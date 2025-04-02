import { BASE_URL, websocketBaseUrl } from "@/constants";
import { showSnackbar } from "@/lib/overlays";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useFleetInterstageMovementStream = (fleetNo?: string) => {
  const [connected, setConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    id: string;
    name: string;
  }>();
  const [nextLocation, setNextLocation] = useState<{
    id: string;
    name: string;
  }>();
  const [currentRoute, steCurrentRoute] = useState<{
    id: string;
    name: string;
  }>();
  useEffect(() => {
    // Only attempt connection if fleetNo exists
    if (!fleetNo) return;

    // Cleanup previous connection
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    }

    // Create new socket connection
    const socketInstance = io(`${BASE_URL}${websocketBaseUrl}/fleet-movement`, {
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
    socketInstance.on(
      "stream_movement",
      (
        routeId,
        routeName,
        currStageId,
        currStageName,
        nextStageId,
        nextStageName
      ) => {
        steCurrentRoute({ id: routeId, name: routeName });
        setCurrentLocation({ id: currStageId, name: currStageName });
        setNextLocation({ id: nextStageId, name: nextStageName });
      }
    );

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.removeAllListeners();
        socketRef.current = null;
      }
    };
  }, [fleetNo]);
  return {
    socketRef,
    connected,
    currentStage: currentLocation,
    nextStage: nextLocation,
    currentRoute,
  };
};

export default useFleetInterstageMovementStream;
