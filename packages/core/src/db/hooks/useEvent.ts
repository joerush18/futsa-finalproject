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
  return useMutation(["create-event"], (data: IEvents) => createEvent(data));
};

const useGetEventsByFutsal = (futsalId: string) => {
  return useQuery(["get-events-by-futsalId"], () =>
    getEventsByFutsal(futsalId)
  );
};

const useGetAllEvents = () => {
  const { setEvents } = useEventStore();
  return useQuery(["get-events-by-userId"], () => getAllEvents(), {
    onSuccess: (data) => {
      setEvents(data);
    },
  });
};

const useUpdateEvent = () => {
  return useMutation(
    ["update-booking"],
    async (data: Partial<IEvents> & Pick<IEvents, "id">) => updateEvent(data)
  );
};

export {
  useCreateEvent,
  useGetAllEvents,
  useGetEventsByFutsal,
  useUpdateEvent,
};
