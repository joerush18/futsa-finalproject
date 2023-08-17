import { IEvents, useGetAllEvents } from "core";
import useCurrentUser from "./useCurrentUser";

interface EventTypes {
  self: IEvents[];
  others: IEvents[];
}

const useEvent = () => {
  const { data, isLoading } = useGetAllEvents();
  const { futsal } = useCurrentUser();
  const events = data?.reduce<EventTypes>(
    (acc: EventTypes, event: IEvents) => {
      if (!event) {
        return acc;
      }
      if (event && event.createdBy && event.createdBy.id === futsal?.id) {
        acc.self.push(event);
      } else {
        acc.others.push(event);
      }
      return acc;
    },
    { self: [], others: [] }
  );

  return {
    data,
    isLoading,
    selfEvent: events?.self,
    othersEvent: events?.others,
  };
};

export default useEvent;
