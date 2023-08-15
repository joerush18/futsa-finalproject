import { create } from "zustand";
import { IEvents } from "../types";

interface Eventstore {
  events: IEvents[];
  setEvents: (values: IEvents[]) => void;
}

const useEventStore = create<Eventstore>((set) => ({
  events: [],
  setEvents: (value: IEvents[]) => {
    set((state) => ({ ...state.events, events: value }));
  },
}));

export default useEventStore;
export { useEventStore };
