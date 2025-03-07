import uniqueId from "lodash/uniqueId";
import React, { ReactNode } from "react";
import { DimensionValue } from "react-native";
import { ModalOptions } from "../types";
import { BottomSheetModalWrapper } from "../wrappers";
import { useOverlayStore } from "@/lib/global-store";

export const showModalBottomSheet = (
  component?: ReactNode,
  {
    dismissable = true,
    transparent,
    height,
    title,
  }: ModalOptions & { title?: string; height?: DimensionValue } = {}
) => {
  const state = useOverlayStore.getState();
  const id = uniqueId(`${Date.now()}`);

  const dismiss = () => state.dismiss(id);
  state.updateOverlays([
    ...state.overlays,
    {
      id,
      type: "modal",
      modalOptions: {
        transparent: transparent ?? true,
        dismissable: dismissable ?? true,
      },
      component: (
        <BottomSheetModalWrapper
          height={height}
          title={title}
          dismissible={dismissable}
          onDismiss={dismiss}
        >
          {component}
        </BottomSheetModalWrapper>
      ),
    },
  ]);

  return dismiss;
};
