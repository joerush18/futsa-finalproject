import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooking, getBookingByFutsalId } from "../methods";
import { IBookings } from "../../types";
import { useBookingStore } from "../../store";

const useCreateBooking = () => {
  return useMutation(
    ["create-booking"],
    (data: IBookings) => createBooking(data),
    {
      onSuccess: (data) => {
        console.log("Booking created successfully.");
      },
      onError: (data) => {
        console.log("Error while creating booking.");
      },
    }
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
      onError: (data) => {
        console.log({ data });
      },
    }
  );
};

export { useCreateBooking, useGetBookingByFutsalId };
