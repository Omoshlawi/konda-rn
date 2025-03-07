import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import Overlay from "./Overlay";
import { SnackBar } from "./wrappers";
import { useOverlays } from "../global-store";

type Props = PropsWithChildren<{}>;

const OverlayPortal: FC<Props> = ({ children }) => {
  const { overlays, dismiss } = useOverlays();
  const snackItems = useMemo(
    () => overlays.filter((o) => o.type === "snackbar"),
    [overlays]
  );
  const modals = useMemo(
    () => overlays.filter((o) => o.type === "modal"),
    [overlays]
  );
  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow((state) => !state);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {children}
      {modals.map((modal) => (
        <Overlay
          key={modal.id}
          animation={modal.modalOptions?.animation ?? "slide"}
          transparent={modal.modalOptions?.transparent}
          onRequestDismiss={() => {
            if (modal.modalOptions?.dismissable) {
              dismiss(modal.id);
            }
          }}
        >
          <>
            {modal.component}
            <SnackBar items={snackItems} />
          </>
        </Overlay>
      ))}
      <SnackBar items={snackItems} />
    </>
  );
};

export default OverlayPortal;
