import { useEffect, useRef, useState } from "react";
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SwipableActionItemContainer from "./SwipableActionItemContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipableActionButton } from "./types";
import { sleep } from "@/lib/utils";

/**
 * The smart preview card is mainly used to add sliding action menu. Basically you swipe left on the
 * preview card to reveal an action menu like edit, delete...
 */
type Props = {
  /**
   * This should be the preview card. Pass it as a child to this component.
   */
  children: React.ReactNode;

  /**
   * If passed, this will be triggered when the user starts to open the action menu.
   */
  onOpen?: () => void;

  /**
   * If passed, this will be triggered when the user closes the action menu.
   */
  onClose?: () => void;

  /**
   * The action buttons to display.
   */
  actionButtons: SwipableActionButton[];

  /**
   * If true, and the user has not entered the actions menu in the past, then the component will
   * bounce a little to indicate that there is a swiping action available.
   */
  enableOnboarding?: boolean | undefined;
};
const SwipableAction = ({
  children,
  onOpen,
  onClose,
  actionButtons,
  enableOnboarding,
}: Props) => {
  const showingOnboardingRef = useRef(false);
  const swipeableRef = useRef<SwipeableMethods>(null);
  const showOnboarding = async () => {
    await sleep(200);
    swipeableRef.current?.openRight();
    await sleep(800);
    swipeableRef.current?.close();
    showingOnboardingRef.current = false;
  };
  useEffect(() => {
    (async () => {
      if (!enableOnboarding) return;

      const hasEnteredSmartPreviewCardMenuInPast = await AsyncStorage.getItem(
        "hasEnteredSmartPreviewCardMenuInPast"
      );
      if (hasEnteredSmartPreviewCardMenuInPast) return;

      showingOnboardingRef.current = true;
      swipeableRef.current?.openRight();
      showOnboarding();
    })();
  }, [!!swipeableRef.current?.openRight]);

  let parentDrag = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => {
    return {
      pointerEvents:
        parentDrag.value !== 0 ? ("none" as const) : ("auto" as const),
    };
  }, []);

  return (
    <GestureHandlerRootView onMoveShouldSetResponder={() => true}>
      <Swipeable
        ref={swipeableRef}
        rightThreshold={40}
        renderRightActions={(prog, drag) => {
          return (
            <SwipableActionItemContainer
              actionButtons={actionButtons}
              prog={prog}
              drag={drag}
              parentDrag={parentDrag}
            />
          );
        }}
        onSwipeableOpenStartDrag={() => {
          if (onOpen) onOpen();
        }}
        onSwipeableClose={() => onClose && onClose()}
        onSwipeableWillOpen={() => {
          // For the purpose of this demo, we do not turn off the onboarding nudge ever but if you wanted to
          // all you would have to do is uncomment the following lines.
          if (!showingOnboardingRef.current)
            AsyncStorage.setItem(
              "hasEnteredSmartPreviewCardMenuInPast",
              "true"
            );
        }}
      >
        <Reanimated.View animatedProps={animatedProps}>
          {children}
        </Reanimated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default SwipableAction;
