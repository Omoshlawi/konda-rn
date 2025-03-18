import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, TextInput, Text, IconButton } from "@/components";
import { io, Socket } from "socket.io-client";
import { BASE_URL, websocketBaseUrl } from "@/constants";
import { useTheme } from "@/lib/theme";
import { showSnackbar } from "@/lib/overlays";

const Shell = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const theme = useTheme();
  const [cmd, setCmd] = useState<string>();

  useEffect(function didMount() {
    const socketInstance = io(`${BASE_URL}${websocketBaseUrl}/cmd`, {
      reconnectionDelayMax: 10000,
    });

    setSocket(socketInstance); // Store socket instance in state

    socketInstance.io.on("open", () => setConnected(true));
    socketInstance.io.on("close", () => setConnected(false));

    socketInstance.on("cmd", (data) => {
      setMessages((state) => [...state, data]);
    });
    socketInstance.on("new_connection", (data) => {
      setMessages((state) => [
        ...state,
        `new client ${data?.client} connected`,
      ]);
    });

    return function didUnmount() {
      socketInstance.disconnect();
      socketInstance.removeAllListeners();
    };
  }, []);

  // Implement handleSendCommand
  const handleSendCommand = () => {
    if (socket && cmd) {
      socket.emit("cmd", cmd);
      setCmd(""); // Clear input after sending
      showSnackbar({
        kind: "success",
        title: "Success",
        subtitle: `Command ${cmd} sent succesfully`,
      });
    } else {
      showSnackbar({
        kind: "error",
        title: "error",
        subtitle: `Command did not send`,
      });
    }
  };

  return (
    <Box flex={1} flexDirection={"column"} gap={"m"}>
      {!connected && (
        <>
          <Text color={"text"}>Connecting to server...</Text>
          <Text color={"text"}>
            Make sure the backend is started and reachable
          </Text>
        </>
      )}

      {connected && (
        <>
          <ScrollView style={{ flex: 1 }}>
            <Text color={"text"} style={{ fontWeight: "bold" }}>
              Connections established
            </Text>
            {messages.map((message, index) => (
              <Text color={"text"} key={index}>
                {message}
              </Text>
            ))}
          </ScrollView>
          <Box flexDirection={"row"} gap={"m"} alignItems={"center"}>
            <Box flex={1} alignItems={"center"}>
              <TextInput
                placeholder="Enter command ..."
                value={cmd}
                onChangeText={setCmd}
              />
            </Box>
            <IconButton
              icon={{ family: "FontAwesome", name: "send" }}
              onPress={handleSendCommand}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Shell;

const styles = StyleSheet.create({});
