import { Box, Stack, Typography } from "@mui/material";
import { IEvents } from "core";
import { EventCard } from "./EventCard";

export const EventCardGroup = ({ events }: { events?: IEvents[] }) => {
  return (
    <Stack flexDirection="row" alignItems="flex-start" gap={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "15px",
          width: "100%",
        }}
      >
        {events?.length ? (
          events.map((event, index) => (
            <EventCard event={event} key={`event-${index}`} />
          ))
        ) : (
          <Typography variant="h6">No events found.</Typography>
        )}
      </Box>
      {/* {event.name && events?.length ? <EventDetailsCard event={event} /> : ""} */}
    </Stack>
  );
};
