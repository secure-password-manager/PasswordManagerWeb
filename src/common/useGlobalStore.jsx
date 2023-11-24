import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  symmetricKey: null,
  setSymmetricKey: (symmetricKey) =>
    set((state) => ({
      ...state,
      symmetricKey: symmetricKey,
    })),
  deleteSymmetricKey: () =>
    set((state) => ({
      ...state,
      symmetricKey: null,
    })),
}));
