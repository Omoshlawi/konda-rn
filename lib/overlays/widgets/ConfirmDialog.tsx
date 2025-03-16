import { Box, Text } from "@/components";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: FC<Props> = ({ message, title, onCancel, onConfirm }) => {
  return (
    <Box p={"m"} gap={"m"} width={"100%"}>
      <Text color={"text"} fontWeight={"bold"} variant={"bodyLarge"}>
        {title}
      </Text>
      <Text color={"text"}>{message}</Text>

      <Box
        flexDirection={"row"}
        gap={"m"}
        justifyContent={"center"}
        pt={"m"}
        alignContent={"center"}
      >
        <TouchableOpacity onPress={onCancel} style={styles.flex}>
          <Text color={"error"} fontWeight="700" textAlign={"center"}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm} style={styles.flex}>
          <Text color={"primary"} fontWeight="700" textAlign={"center"} p={"s"}>
            Confirm
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
