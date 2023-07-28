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

const useGetBookingByUserId = (userId: string) => {
  const { setUserBookings } = useBookingStore();
  return useQuery(["get-booking-by-userId"], () => getBookingByUserId(userId), {
    onSuccess: (data) => {
      setUserBookings(data);
    },
    onError: (data) => {
      console.log({ data });
    },
  });
};

const useUpdateBooking = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<IBookings> & Pick<IBookings, "id">) =>
      updateBooking(data),
    {
      onSuccess: (data) => {
        console.log("Booking updated successfully");
        // Do something with the data if needed
      },
      onError: (error) => {
        console.log("Booking update failed");
        // Handle the error if needed
      },
    }
  );
};

export {
  useCreateBooking,
  useGetBookingByFutsalId,
  useUpdateBooking,
  useGetBookingByUserId,
};
