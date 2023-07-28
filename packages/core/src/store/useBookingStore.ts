import { create } from "zustand";
import { IBookings } from "../types";

interface BookingStore {
  bookings: IBookings[];
  userBookings: IBookings[];
  setBookings: (values: IBookings[]) => void;
  setUserBookings: (values: IBookings[]) => void;
  updateBookingStatus: (
    data: Partial<IBookings> & Pick<IBookings, "id">
  ) => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  userBookings: [],
  setBookings: (value: IBookings[]) => {
    set((state) => ({ ...state.bookings, bookings: value }));
  },
  setUserBookings: (value: IBookings[]) => {
    set((state) => ({ ...state.userBookings, userBookings: value }));
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
