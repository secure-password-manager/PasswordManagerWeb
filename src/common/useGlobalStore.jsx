import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGlobalStore = create(
  persist((set) => ({
    symmetricKey: "",
    setSymmetricKey: (symmetricKey) => {
      set((state) => ({
        ...state,
        symmetricKey: symmetricKey,
      }))},
    deleteSymmetricKey: () =>
      set((state) => ({
        ...state,
        symmetricKey: "",
      })),
  }), {
  name: "key-fortress"
  })
);
