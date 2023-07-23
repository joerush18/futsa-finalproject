import { useBookingStore, useGetBookingByFutsalId } from "core";
import useCurrentUser from "./useCurrentUser";

const useBookings = () => {
  const { bookings } = useBookingStore();
  const { futsal } = useCurrentUser();
  const {
    data: bookingData,
    isLoading: fetchingData,
    refetch,
  } = useGetBookingByFutsalId(futsal.id);

  let DateStatusMap = new Map<string, string>();

  bookingData?.forEach((booking) => {
    DateStatusMap.set(booking.bookedFor.split(" ").join("_"), booking.status);
  });
  return {
    bookings,
    fetchingData,
    DateStatusMap,
    refetch,
  };
};

export default useBookings;
