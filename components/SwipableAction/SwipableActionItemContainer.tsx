import lodashUniqueId from "lodash/uniqueId";
import { FC, memo, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import SwipableActionItem from "./SwipableActionItem";
import { SwipableActionButton } from "./types";

const buttonWidth = 70;
type Props = {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  parentDrag: SharedValue<number>;
  actionButtons: SwipableActionButton[];
};

const SwipableActionItemContainer: FC<Props> = ({
  prog,
  drag,
  parentDrag,
  actionButtons,
}) => {
  const styles = useMemo(
    () => createStyles(actionButtons.length),
    [actionButtons.length]
  );

  const uniqueId = useRef(lodashUniqueId(`${Date.now()}`));
  const animatedStyle = useAnimatedStyle(() => {
    parentDrag.value = drag.value;

    return {
      transform: [
        { translateX: drag.value + buttonWidth * actionButtons.length },
      ],
    };
  });

  return (
    <Reanimated.View style={[styles.container, animatedStyle]}>
      {actionButtons.map((button, index) => {
        return (
          <SwipableActionItem
            key={`smart-preview-card-action-button-${index}-${button.label}-${uniqueId.current}`}
            button={button}
          />
        );
      })}
    </Reanimated.View>
  );
};

const createStyles = (actionButtonsCount: number) =>
  StyleSheet.create({
    container: {
      width: buttonWidth * actionButtonsCount,
      flexDirection: "row",
    },
  });

export default memo(SwipableActionItemContainer);
