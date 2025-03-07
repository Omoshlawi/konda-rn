import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { ModalWrapper } from "../wrappers";
import uniqueId from "lodash/uniqueId";
import { useOverlayStore } from "@/lib/global-store";

export const showModal = (
  component?: ReactNode,
  options: ModalOptions & { title?: string; actions?: ReactNode } = {}
) => {
  const state = useOverlayStore.getState();
  const id = uniqueId(`${Date.now()}`);

  const dismiss = () => state.dismiss(id);
  state.updateOverlays([
    ...state.overlays,
    {
      component: (
        <ModalWrapper
          title={options?.title}
          onClose={dismiss}
          actions={options?.actions}
        >
          {component}
        </ModalWrapper>
      ),
      id,
      type: "modal",
      modalOptions: {
        transparent: options.transparent ?? false,
        dismissable: options.dismissable ?? true,
      },
    },
  ]);

  return dismiss;
};
