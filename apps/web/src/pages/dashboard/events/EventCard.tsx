import Color from "@/utils/color";
import { Box, Typography } from "@mui/material";
import { IEvents, timeAgo } from "core";
import { EventHighlights } from "./EventHighlights";

export const EventCard = ({
  event,
  setEvent,
}: {
  event: IEvents;
  setEvent: React.Dispatch<React.SetStateAction<IEvents>>;
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        maxWidth: "450px",
        paddingBottom: "10px",
        marginBottom: "10px",
        "&:hover": {
          cursor: "pointer",
          "& .eventTitle": {
            textDecoration: "underline",
          },
        },
      }}
      onClick={() => setEvent(event)}
    >
      {event?.hasExpired ? (
        <Box
          sx={{
            position: "absolute",
            inset: "0px",
            backgroundColor: Color.grey[200],
            opacity: "0.4",
          }}
        ></Box>
      ) : null}

      <img
        src={event?.eventImage}
        alt="Event Image"
        style={{
          objectFit: "cover",
          borderRadius: "4px",
          height: "150px",
          width: "100%",
        }}
      />
      <Box
        sx={{
          paddingX: 2,
        }}
      >
        <Typography
          variant="h6"
          marginTop={1.5}
          lineHeight={1}
          className="eventTitle"
        >
          {event?.name}
        </Typography>
        <Typography variant="body2">{event?.createdBy?.name}</Typography>
        <EventHighlights event={event} isDesc={false} />
        <Typography
          sx={{
            fontWeight: 600,
            opacity: 0.6,
            fontSize: "0.8rem",
            mt: 0.5,
          }}
        >
          {timeAgo(event?.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
};
