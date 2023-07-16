import { IFutsal } from "core/src/types/futsals.types";
import { create } from "zustand";

interface FutsalsStore {
  futsals: IFutsal[];
  setFutsals: (values: IFutsal[]) => void;
}

const useFutsalsStore = create<FutsalsStore>((set) => ({
  futsals: [],
  setFutsals: (value: IFutsal[]) => {
    set((state) => ({ ...state.futsals, futsals: value }));
  },
}));

export default useFutsalsStore;
