import { IEvents, useGetAllEvents } from "core";
import useCurrentUser from "./useCurrentUser";

interface EventTypes {
  self: IEvents[];
  others: IEvents[];
}

const useEvents = () => {
  const { data, isLoading, refetch } = useGetAllEvents();
  const { user } = useCurrentUser();
  const events = data?.reduce<EventTypes>(
    (acc: EventTypes, event: IEvents) => {
      if (!event) {
        return acc;
      }
      if (event.teams?.some((team) => team.ownerId === user.id)) {
        acc.self.push(event);
      } else {
        if (!event.hasExpired) {
          acc.others.push(event);
        }
      }
      return acc;
    },
    { self: [], others: [] }
  );

  return {
    myEvents: events?.self,
    otherEvents: events?.others,
    isLoading,
    refetch,
  };
};

export default useEvents;
