import { useEventStore } from "core";
import { EventDetailsCard } from "./EventDetailsCard";
import { useParams } from "react-router-dom";
import useEvent from "@/hooks/useEvents";
import Loading from "@/components/Loading";

const EventDetailsPage = () => {
  useEvent();
  const { events } = useEventStore();
  const params = useParams();
  const event = events.find((event) => event.id === params.id);
  if (!event || !params) return <Loading label="Fetching" />;
  return <EventDetailsCard event={event} />;
};

export default EventDetailsPage;
