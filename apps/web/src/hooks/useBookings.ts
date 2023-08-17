import {
  BOOKING_STATUS,
  IBookings,
  useBookingStore,
  useGetBookingByFutsalId,
  useUpdateBooking,
} from "core";
import useCurrentUser from "./useCurrentUser";
import { toast } from "react-hot-toast";
interface IBookingTypes {
  pendings: IBookings[];
  booked: IBookings[];
  rejected: IBookings[];
  cancelled: IBookings[];
  upcoming: IBookings[];
}
const useBookings = () => {
  const { bookings, updateBookingStatus } = useBookingStore();
  const { futsal } = useCurrentUser();
  const { isLoading: fetchingData, refetch } = useGetBookingByFutsalId(
    futsal.id
  );
  const { mutate: updateBooking } = useUpdateBooking();

  const bookingsByStatus = bookings.reduce(
    (acc: IBookingTypes, booking: IBookings) => {
      if (booking.status === BOOKING_STATUS.PENDING) {
        acc.pendings.push(booking);
      } else if (booking.status === BOOKING_STATUS.BOOKED) {
        acc.booked.push(booking);
        if (new Date(booking.bookedFor) > new Date()) {
          acc.upcoming.push(booking);
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
      booked: [],
      rejected: [],
      cancelled: [],
      upcoming: [],
    }
  );

  let DateStatusMap = new Map<string, string>();

  bookings
    .filter((book) => !book.hasExpired)
    .forEach((booking) => {
      DateStatusMap.set(booking.bookedFor.split(" ").join("_"), booking.status);
    });

  const handleAccept = (id: string) => {
    const data = {
      id,
      status: BOOKING_STATUS.BOOKED,
      updatedAt: +new Date(),
    };
    try {
      updateBooking(data);
      updateBookingStatus(data);
      toast.success("Booking accepted");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const handleReject = (id: string) => {
    const data = {
      id,
      status: BOOKING_STATUS.REJECTED,
      hasExpired: true,
      updatedAt: +new Date(),
    };
    try {
      updateBooking(data);
      updateBookingStatus(data);

      toast.success("Booking rejected");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return {
    bookings,
    fetchingData,
    DateStatusMap,
    refetch,
    bookingsByStatus,
    handleAccept,
    handleReject,
  };
};

export default useBookings;
