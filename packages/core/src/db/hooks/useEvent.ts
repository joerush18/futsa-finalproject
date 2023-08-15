import { useMutation, useQuery } from "@tanstack/react-query";
import { IEvents } from "../../types";
import {
  createEvent,
  getAllEvents,
  getEventsByFutsal,
  updateEvent,
} from "../methods";
import useEventStore from "../../store/useEventStore";

const useCreateEvent = () => {
  return useMutation(["create-event"], (data: IEvents) => createEvent(data), {
    onSuccess: (data) => {
      console.log("Event Created Successfully.");
    },
    onError: (data) => {
      console.log("Error creating event.");
    },
  });
};

const useGetEventsByFutsal = (futsalId: string) => {
  // const { setBookings } = useBookingStore();
  return useQuery(
    ["get-event-by-futsalId"],
    () => getEventsByFutsal(futsalId),
    {
      onSuccess: (data) => {
        // setBookings(data);
      },
      onError: (data) => {
        console.log({ data });
      },
    }
  );
};

const useGetAllEvents = () => {
  const { setEvents } = useEventStore();
  return useQuery(["get-booking-by-userId"], () => getAllEvents(), {
    onSuccess: (data) => {
      setEvents(data);
    },
    onError: (data) => {
      console.log({ data });
    },
  });
};

const useUpdateEvent = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<IEvents> & Pick<IEvents, "id">) => updateEvent(data),
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
  useCreateEvent,
  useGetAllEvents,
  useGetEventsByFutsal,
  useUpdateEvent,
};
