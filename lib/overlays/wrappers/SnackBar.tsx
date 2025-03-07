import { Overlay } from "@/lib/global-store";
import { useTheme } from "@/lib/theme";
import React, { FC } from "react";
import { View } from "react-native";

type Props = {
  items?: Array<Overlay>;
};

const SnackBar: FC<Props> = ({ items = [] }) => {
  const { spacing, zIndices } = useTheme();
  if (!items.length) return false;
  return (
    <View
      style={{
        position: "absolute",
        gap: spacing.s,
        bottom: 20,
        left: 0,
        right: 0,
        padding: spacing.m,
        display: "flex",
        flexDirection: "column",
        zIndex: zIndices.overlay,
      }}
    >
      {(items ?? []).map((item) => (
        <View key={item.id}>{item.component}</View>
      ))}
    </View>
  );
};

export default SnackBar;
