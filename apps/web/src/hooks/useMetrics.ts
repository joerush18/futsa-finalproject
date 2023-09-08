import {
  BOOKING_STATUS,
  useBookingStore,
  useGetTransactionByFutsal,
} from "core";
import useCurrentUser from "./useCurrentUser";

const useMetrics = () => {
  const { futsal } = useCurrentUser();
  const { data: transactions } = useGetTransactionByFutsal(futsal?.id ?? "");
  const { bookings } = useBookingStore();

  const totalBalance =
    transactions &&
    transactions?.reduce((acc, curr) => {
      if (curr.status === "Completed") {
        return acc + +curr.amount;
      }
      return acc;
    }, 0);

  const totalBookings = bookings.length;
  const totalPendings = bookings.reduce((acc, book) => {
    if (book.status === BOOKING_STATUS.PENDING) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const totalApproved = bookings.reduce((acc, book) => {
    if (book.status === BOOKING_STATUS.BOOKED) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return {
    totalApproved,
    totalBalance,
    totalBookings,
    totalPendings,
  };
};

export default useMetrics;
