import useModalOverlayStore from "./useOverlayStore";

const useOverlays = () => {
  const overlays = useModalOverlayStore((state) => state.overlays);
  const dismiss = useModalOverlayStore((state) => state.dismiss);
  return { overlays, dismiss };
};

export default useOverlays;
