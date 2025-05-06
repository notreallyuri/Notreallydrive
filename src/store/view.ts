import { create } from "zustand";
import { persist } from "zustand/middleware";

type View = "grid" | "list";

export const useViewStore = create(
  persist<{
    view: View;
    setView: (view: View) => void;
  }>(
    (set) => ({
      view: "list",
      setView: (view) => set({ view }),
    }),
    {
      name: "view-storage",
    },
  ),
);
