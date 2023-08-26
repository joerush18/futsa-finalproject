import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBooking,
  getBookingByFutsalId,
  getBookingByUserId,
  updateBooking,
} from "../methods";
import { IBookings } from "../../types";
import { useBookingStore } from "../../store";

const useCreateBooking = () => {
  return useMutation(["create-booking"], (data: IBookings) =>
    createBooking(data)
  );
};

const useGetBookingByFutsalId = (futsalId: string) => {
  const { setBookings } = useBookingStore();
  return useQuery(
    ["get-booking-by-futsalId"],
    () => getBookingByFutsalId(futsalId),
    {
      onSuccess: (data) => {
        setBookings(data);
      },
    }
  );
};

const useGetBookingByUserId = (userId: string) => {
  const { setUserBookings } = useBookingStore();
  return useQuery(["get-booking-by-userId"], () => getBookingByUserId(userId), {
    onSuccess: (data) => {
      setUserBookings(data);
    },
  });
};

const useUpdateBooking = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<IBookings> & Pick<IBookings, "id">) =>
      updateBooking(data)
  );
};

export {
  useCreateBooking,
  useGetBookingByFutsalId,
  useUpdateBooking,
  useGetBookingByUserId,
};
