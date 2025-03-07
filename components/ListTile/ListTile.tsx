import { useTheme } from "@/lib/theme";
import React, { FC, ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle
} from "react-native";
import Box from "../Box";
import Text from "../Text";

type ListTileProps = {
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
  leading?: ReactNode;
  borderBottom?: boolean;
  onPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
};

const ListTile: FC<ListTileProps> = ({
  title,
  borderBottom = false,
  leading,
  onPress,
  subtitle,
  trailing,
  containerStyles,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Pressable
      onPress={onPress}
      disabled={typeof onPress === "function" ? false : true}
      style={[
        styles.tile,
        {
          padding: theme.spacing.s,
          gap: theme.spacing.s,
          borderColor: colors.hintColor,
        },
        borderBottom ? styles.borderBottom : {},
        containerStyles,
      ]}
    >
      {leading}
      <Box width={"100%"} flex={1} gap={"s"} justifyContent={"center"}>
        {title && (
          <Text color={"text"} variant={"bodyLarge"}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text color={"outline"} variant={"bodyMedium"}>
            {subtitle}
          </Text>
        )}
      </Box>
      {trailing}
    </Pressable>
  );
};

export default ListTile;

const styles = StyleSheet.create({
  borderBottom: {
    // borderColor: microColors.darkGrey,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  tile: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
  },
});
