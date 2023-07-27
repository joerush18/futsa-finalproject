import { create } from "zustand";
import { IBookings } from "../types";

interface BookingStore {
  bookings: IBookings[];
  singleBooking: IBookings;
  setBookings: (values: IBookings[]) => void;
  updateBookingStatus: (
    data: Partial<IBookings> & Pick<IBookings, "id">
  ) => void;
  setSingleBooking: (id: string) => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  singleBooking: {} as IBookings,
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
  setSingleBooking: (id: string) => {
    set((state) => {
      const singleBooking = state.bookings.find((booking) => booking.id === id);
      return { ...state, singleBooking };
    });
  },
}));

export default useBookingStore;
export { useBookingStore };
