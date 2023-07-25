import {
  BOOKING_STATUS,
  IBookings,
  useBookingStore,
  useGetBookingByFutsalId,
} from "core";
import useCurrentUser from "./useCurrentUser";
interface IBookingTypes {
  pendings: IBookings[];
  approved: IBookings[];
  rejected: IBookings[];
  cancelled: IBookings[];
  upComings: IBookings[];
}
const useBookings = () => {
  const { bookings } = useBookingStore();
  const { futsal } = useCurrentUser();
  const { isLoading: fetchingData, refetch } = useGetBookingByFutsalId(
    futsal.id
  );

  let DateStatusMap = new Map<string, string>();

  bookings?.forEach((booking) => {
    DateStatusMap.set(booking.bookedFor.split(" ").join("_"), booking.status);
  });

  const bookingsByStatus = bookings.reduce(
    (acc: IBookingTypes, booking: IBookings) => {
      if (booking.status === BOOKING_STATUS.PENDING) {
        acc.pendings.push(booking);
      } else if (booking.status === BOOKING_STATUS.BOOKED) {
        acc.approved.push(booking);
        if (
          booking.bookedFor.split(" ")[0] >
          new Date().toISOString().split("T")[0]
        ) {
          acc.upComings.push(booking);
        }
      } else if (booking.status === BOOKING_STATUS.REJECTED) {
        acc.rejected.push(booking);
      } else if (booking.status === BOOKING_STATUS.CANCELLED) {
        acc.cancelled.push(booking);
      }
      return acc;
    },
    {
      pendings: [],
      approved: [],
      rejected: [],
      cancelled: [],
      upComings: [],
    }
  );

  return {
    bookings,
    fetchingData,
    DateStatusMap,
    refetch,
    bookingsByStatus,
  };
};

export default useBookings;
