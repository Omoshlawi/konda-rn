import { TouchableOpacity, Text } from "react-native";
import Reanimated from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { SwipableActionButton } from "./types";
import { FC } from "react";

type Props = {
  button: SwipableActionButton;
};

const SwipableActionItem: FC<Props> = ({ button }) => {
  return (
    <Reanimated.View style={styles.actionButtonContainer}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor: button.backgroundColor },
        ]}
        onPress={button.onPress}
        accessibilityLabel={button.accessibilityLabel}
        disabled={button.isLoading}
      >
        <Text style={[styles.actionButtonText, { color: button.labelColor }]}>
          {button.label}
        </Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

export default SwipableActionItem;

const styles = StyleSheet.create({
  actionButtonContainer: {
    flexGrow: 1,
    width: 64,
  },
  actionButton: {
    flexGrow: 1,
    justifyContent: "center",
  },
  actionButtonText: {
    fontWeight: 600,
  },
});
