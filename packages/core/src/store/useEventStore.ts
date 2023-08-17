import { create } from "zustand";
import { IEvents } from "../types";

interface Eventstore {
  events: IEvents[];
  setEvents: (values: IEvents[]) => void;
  updateEvent: (data: Partial<IEvents> & Pick<IEvents, "id">) => void;
}

const useEventStore = create<Eventstore>((set) => ({
  events: [],
  setEvents: (value: IEvents[]) => {
    set((state) => ({ ...state.events, events: value }));
  },
  updateEvent: (data: Partial<IEvents> & Pick<IEvents, "id">) => {
    set((state) => {
      const newEvent = state.events.map((t) => {
        if (t.id === data.id) {
          return { ...t, ...data };
        }
        return t;
      });
      return { ...state, events: newEvent };
    });
  },
}));

export default useEventStore;
export { useEventStore };
