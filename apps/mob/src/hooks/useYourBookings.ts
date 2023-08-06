import { useGetBookingByUserId } from "core";
import useCurrentUser from "./useCurrentUser";
import useRefetch from "./useRefetch";

const useYourBookings = () => {
  const { user } = useCurrentUser();
  const {
    data: bookings,
    isLoading: fetchingData,
    refetch,
  } = useGetBookingByUserId(user.id ?? "");
  const { onRefresh, refreshing } = useRefetch(refetch);

  return { onRefresh, refreshing, fetchingData, bookings };
};

export default useYourBookings;
