import { create } from "zustand";
import { IBookings } from "../types";

interface BookingStore {
  bookings: IBookings[];
  setBookings: (values: IBookings[]) => void;
  updateBookingStatus: (
    data: Partial<IBookings> & Pick<IBookings, "id">
  ) => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  setBookings: (value: IBookings[]) => {
    set((state) => ({ ...state.bookings, bookings: value }));
  },
  updateBookingStatus: (data: Partial<IBookings> & Pick<IBookings, "id">) => {
    set((state) => {
      const newBookings = state.bookings.map((booking) => {
        if (booking.id === data.id) {
          return { ...booking, ...data };
        }
        return booking;
      });
      return { ...state, bookings: newBookings };
    });
  },
}));

export default useBookingStore;
export { useBookingStore };
