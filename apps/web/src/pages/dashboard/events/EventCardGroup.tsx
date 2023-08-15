import { Box, Stack, Typography } from "@mui/material";
import { IEvents } from "core";
import { useState } from "react";
import { EventCard } from "./EventCard";
import { EventDetailsCard } from "./EventDetailsCard";

export const EventCardGroup = ({ events }: { events?: IEvents[] }) => {
  const [event, setEvent] = useState<IEvents>({} as IEvents);

  return (
    <Stack
      flexDirection="row"
      alignItems="flex-start"
      gap={2}
      paddingTop="40px"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {events?.length ? (
          events.map((event, index) => (
            <EventCard
              event={event}
              key={`event-${index}`}
              setEvent={setEvent}
            />
          ))
        ) : (
          <Typography>No events found.</Typography>
        )}
      </Box>
      {event.name && events?.length ? <EventDetailsCard event={event} /> : ""}
    </Stack>
  );
};
