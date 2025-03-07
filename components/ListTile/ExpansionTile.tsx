import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ExpoIconComponent } from "../ExpoIcons";
import { useTheme } from "@/lib/theme";
import Box from "../Box";
import Text from "../Text";

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  leading?: React.ReactElement;
  defaultExpanded?: boolean;
  childContainerStyles?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  borderBottom?: boolean;
  onToggleExpansion?: (expanded: boolean) => void;
  onPress?: () => void;
}>;

const ExpansionTile: FC<Props> = ({
  children,
  leading,
  subtitle,
  title,
  defaultExpanded = false,
  childContainerStyles,
  containerStyles,
  borderBottom,
  onToggleExpansion,
  onPress,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const theme = useTheme();

  useEffect(() => {
    onToggleExpansion?.(expanded);
  }, [expanded]);
  return (
    <TouchableOpacity
      disabled={typeof onPress === "function" ? false : true}
      activeOpacity={0.5}
      style={[
        {
          borderColor: theme.colors.hintColor,
          paddingBottom: theme.spacing.m,
          backgroundColor: expanded ? theme.colors.disabledColor : undefined,
        },
        borderBottom ? styles.borderBottom : {},
        ,
        containerStyles,
      ]}
    >
      <View
        style={[
          styles.tile,
          { padding: theme.spacing.s, gap: theme.spacing.s },
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setExpanded((state) => !state)}
        >
          <ExpoIconComponent
            family="FontAwesome6"
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
          />
        </TouchableOpacity>
      </View>
      {expanded && (
        <Box
          p={"m"}
          marginHorizontal={"m"}
          backgroundColor={"background"}
          style={childContainerStyles}
        >
          {children}
        </Box>
      )}
    </TouchableOpacity>
  );
};

export default ExpansionTile;

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
  },
  borderBottom: {
    // borderColor: microColors.darkGrey,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
});
