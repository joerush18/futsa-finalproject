import { useGetBookingByFutsalId } from "core";

const useBookings = (futsalId: string) => {
  const {
    data: bookingData,
    isLoading: fetchingData,
    refetch,
  } = useGetBookingByFutsalId(futsalId);
  let DateStatusMap = new Map<string, string>();

  bookingData?.forEach((booking) => {
    DateStatusMap.set(booking.bookedFor.split(" ").join("_"), booking.status);
  });

  return {
    bookingData,
    fetchingData,
    DateStatusMap,
    refetch,
  };
};
export default useBookings;
