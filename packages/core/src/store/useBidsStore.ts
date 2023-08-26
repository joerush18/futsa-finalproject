import { create } from "zustand";
import { IBids } from "../types";

interface BidsStore {
  bids: IBids[];
  setBids: (values: IBids[]) => void;
  updateBids: (data: Partial<IBids> & Pick<IBids, "id">) => void;
}

const useBidsStore = create<BidsStore>((set) => ({
  bids: [],
  setBids: (value: IBids[]) => {
    set((state) => ({ ...state.bids, bids: value }));
  },
  updateBids: (data: Partial<IBids> & Pick<IBids, "id">) => {
    set((state) => {
      const newBid = state.bids.map((t) => {
        if (t.id === data.id) {
          return { ...t, ...data };
        }
        return t;
      });
      return { ...state, bids: newBid };
    });
  },
}));

export default useBidsStore;
export { useBidsStore };
