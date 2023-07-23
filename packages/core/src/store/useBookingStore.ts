import { create } from "zustand";
import { IBookings } from "../types";

interface BookingStore {
  bookings: IBookings[];
  setBookings: (values: IBookings[]) => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  setBookings: (value: IBookings[]) => {
    set((state) => ({ ...state.bookings, bookings: value }));
  },
}));

export default useBookingStore;
export { useBookingStore };
