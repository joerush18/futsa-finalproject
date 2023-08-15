import { IEvents, useGetAllEvents } from "core";

const useEvents = () => {
  const { data, isLoading, refetch } = useGetAllEvents();
  // const { user } = useCurrentUser();
  // const events = data?.reduce<EventTypes>(
  //   (acc: EventTypes, event: IEvents) => {
  //     if (!event) {
  //       return acc;
  //     }
  //     if (event && event.createdBy && event.createdBy.id === futsal?.id) {
  //       acc.self.push(event);
  //     } else {
  //       acc.others.push(event);
  //     }
  //     return acc;
  //   },
  //   { self: [], others: [] }
  // );

  return {
    events: data,
    isLoading,
    refetch,
  };
};

export default useEvents;
