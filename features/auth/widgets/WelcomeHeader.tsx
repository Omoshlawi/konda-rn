import { StyleSheet, View } from "react-native";
import React from "react";
import { Logo, Box, Text } from "@/components";

const WelcomeHeader = () => {
  return (
    <Box
      p={"l"}
      borderRadius={"large"}
      m="s"
      backgroundColor={"secondaryContainer"}
    >
      <Box
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={"xl"}
      >
        <View>
          <Text color={"secondary"} variant={"titleLarge"}>
            Welcome to the
          </Text>
          <Text variant={"headlineLarge"} color={"primary"} fontWeight={"bold"}>
            Hive
          </Text>
        </View>
        <Logo size={80} />
      </Box>
    </Box>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({});
