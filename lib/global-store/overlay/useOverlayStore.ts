import { create } from "zustand";
import { Overlay } from "../types";

type OverlayStore = {
  overlays: Array<Overlay>;
  update: (store: Partial<OverlayStore>) => void;
  updateOverlays: (overlays: Array<Overlay>) => void;
  dismiss: (id: string) => void;
};

const useOverlayStore = create<OverlayStore>((set) => ({
  overlays: [],
  update: (store: Partial<OverlayStore>) =>
    set((state) => ({
      ...state,
      ...Object.entries(store)?.reduce((prev, [key, val]) => {
        if (val !== undefined && val !== null) {
          return { ...prev, [key]: val };
        }
        return prev;
      }, {}),
    })),
  updateOverlays: (overlays: Array<Overlay>) =>
    set((state) => ({
      ...state,
      overlays,
    })),
  dismiss: (id: string) =>
    set((state) => ({
      ...state,
      overlays: state.overlays.filter((over) => over.id !== id),
    })),
}));

export default useOverlayStore;
