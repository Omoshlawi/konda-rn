import { BASE_URL, websocketBaseUrl } from "@/constants";
import { showSnackbar } from "@/lib/overlays";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { FleetRouteInterStageMovement } from "../types";

const useFleetInterstageMovementStream = (fleetNo?: string) => {
  const [connected, setConnected] = useState(false);
  const [state, setState] = useState<FleetRouteInterStageMovement>();
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
    socketInstance.on("stream_movement", (payload) => {
      const data: FleetRouteInterStageMovement = JSON.parse(payload);
      setState(data);
    });

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
    currentFleetMovementState: state,
  };
};

export default useFleetInterstageMovementStream;
