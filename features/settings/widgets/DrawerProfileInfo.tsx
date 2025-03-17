import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { useSession } from "@/lib/global-store";
import { Box, ImageViewer, Text } from "@/components";
import { useRouter } from "expo-router";

const DrawerProfileInfo = () => {
  const { user } = useSession();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        if (user) router.push("/settings");
        else router.push("/(authentication)/login");
      }}
    >
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
    </Pressable>
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
