import { StyleSheet } from "react-native";
import React from "react";
import { useSession } from "@/lib/global-store";
import { Box, ImageViewer, Text } from "@/components";

const DrawerProfileInfo = () => {
  const { user } = useSession();
  return (
    <Box
      gap={"s"}
      flexDirection={"row"}
      alignItems={"center"}
      marginBottom={"m"}
      borderBottomWidth={StyleSheet.hairlineWidth}
      borderColor={"hintColor"}
      paddingBottom={"l"}
    >
      <ImageViewer style={styles.avatar} />
      <Box>
        <Text fontWeight={"700"} variant={"bodyLarge"} color={"text"}>
          {user ? user?.person?.name ?? "Update name" : "Guest User"}
        </Text>
        <Text color={"text"}>{user?.person?.email ?? "Sign In"}</Text>
      </Box>
    </Box>
  );
};

export default DrawerProfileInfo;

const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
