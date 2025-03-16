import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { MenuItem } from "../types";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/theme";
import Color from "color";
import { Box, ExpoIconComponent, Text } from "@/components";

type DashboardMenuItemProps = {
  item: MenuItem;
};

const DashboardMenuItem: FC<DashboardMenuItemProps> = ({ item }) => {
  const router = useRouter();
  const { colors, spacing } = useTheme();
  const colors_ = Color(item.color ?? colors.primary);
  return (
    <TouchableOpacity
      style={[styles.clickable, { margin: spacing.s }]}
      activeOpacity={0.5}
      onPress={() => router.navigate(item.route as any)}
    >
      <Box
        p={"m"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"medium"}
        // borderWidth={1}
        // borderColor={"outline"}
        padding={"m"}
        gap={"m"}
        width={"100%"}
        height={"100%"}
        style={{
          backgroundColor: colors_.alpha(0.07).toString(),
          // borderColor: colors_.alpha(0.07).toString(),
        }}
      >
        <ExpoIconComponent
          {...item.icon}
          color={colors_.toString()}
          size={50}
        />
        <Text
          color={"icon"}
          variant={"bodyLarge"}
          style={{ color: colors_.fade(0.4).darken(0.5).toString() }}
        >
          {item.name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default DashboardMenuItem;

const styles = StyleSheet.create({
  clickable: {
    flexBasis: "48%", // Each item takes up one-third of the row width
    flexGrow: 1, // Allow items to grow uniformly
    aspectRatio: 1, // Maintain square shape
  },
});
