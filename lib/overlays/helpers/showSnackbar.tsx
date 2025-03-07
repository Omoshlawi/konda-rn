import { Box, ExpoIconComponent, Text } from "@/components";
import { useOverlayStore } from "@/lib/global-store";
import { useTheme } from "@/lib/theme";
import Color from "color";
import uniqueId from "lodash/uniqueId";
import React, { FC, useEffect } from "react";
import { TouchableOpacity } from "react-native";

export const showSnackbar = ({
  options,
  subtitle,
  title,
  kind = "info",
}: {
  title?: string;
  subtitle?: string;
  kind?: "success" | "error" | "warning" | "info";
  options?: { timeout?: number; dismissible?: boolean };
} = {}) => {
  const timeout = options?.timeout;
  const state = useOverlayStore.getState();

  const id = uniqueId(`${Date.now()}`);

  state.updateOverlays([
    ...state.overlays,
    {
      component: (
        <Snackbaritem
          timeout={timeout}
          title={title}
          dismissible={options?.dismissible}
          subtitle={subtitle}
          kind={kind}
          onRemove={() => state.dismiss(id)}
        />
      ),
      id: id,
      type: "snackbar",
    },
  ]);
};

type Props = {
  title?: string;
  subtitle?: string;
  timeout?: number;
  onRemove?: () => void;
  dismissible?: boolean;
  kind?: "success" | "error" | "warning" | "info";
  leading?: React.ReactNode;
};
const Snackbaritem: FC<Props> = ({
  subtitle,
  title,
  timeout = 3000,
  onRemove,
  dismissible = false,
  kind,
  leading,
}) => {
  const theme = useTheme();
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove?.();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onRemove]);

  const backgroundColor =
    kind === "info"
      ? "black"
      : kind === "error"
      ? theme.colors.errorContainer
      : kind === "warning"
      ? theme.colors.warningContainer
      : theme.colors.successContainer;

  return (
    <Box
      style={{ backgroundColor: "white" }}
      borderRadius={"small"}
      overflow={"hidden"}
    >
      <Box
        overflow={"hidden"}
        p={"s"}
        gap={"m"}
        flexDirection={"row"}
        style={{
          backgroundColor: Color(backgroundColor).alpha(0.2).toString(),
        }}
      >
        {leading ?? (
          <ExpoIconComponent
            size={18}
            family="AntDesign"
            name={
              kind === "info" || kind === "success" ? "infocirlceo" : "warning"
            }
            color={Color(backgroundColor).alpha(1).toString()}
          />
        )}
        <Box flex={1} flexDirection={"column"}>
          {title && (
            <Text
              style={{
                color: "black",
                flex: 1,
              }}
              variant={"bodySmall"}
              fontWeight={"700"}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={{
                color: Color(backgroundColor).alpha(1).toString(),
              }}
              variant={"bodySmall"}
            >
              {subtitle}
            </Text>
          )}
        </Box>
        {dismissible && (
          <TouchableOpacity onPress={onRemove}>
            <ExpoIconComponent
              family="AntDesign"
              name="closesquareo"
              size={16}
            />
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};
