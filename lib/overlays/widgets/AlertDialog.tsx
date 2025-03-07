import { Box, Text } from "@/components";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  message: string | (() => React.ReactNode);
  actions?: Array<{ title: string; onPress?: () => void; color?: string }>;
};

const AlertDialog: FC<Props> = ({ title, actions = [], message }) => {
  return (
    <Box p={"m"} gap={"m"} width={"100%"}>
      <Text color={"text"} fontWeight={"bold"} variant={"bodyLarge"}>
        {title}
      </Text>
      {typeof message === "string" && <Text color={"text"}>{message}</Text>}
      {typeof message === "function" && <>{message()}</>}

      <Box flexDirection={"row"} gap={"m"} justifyContent={"center"} pt={"m"}>
        {actions.map(({ title, color, onPress }, index) => (
          <TouchableOpacity onPress={onPress} style={styles.flex} key={index}>
            <Text
              fontWeight="700"
              textAlign={"center"}
              p={"s"}
              style={{ color }}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
