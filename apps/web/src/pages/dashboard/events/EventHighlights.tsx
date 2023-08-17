import { Stack } from "@mui/material";
import { IEvents } from "core";
import { ToolTipChip } from "./ToolTipChip";

export const EventHighlights = ({
  event,
  isDesc,
}: {
  event: IEvents;
  isDesc: boolean;
}) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="left"
      flexWrap="wrap"
    >
      <ToolTipChip
        title="Start Date"
        label={event?.eventDate}
        color="#7EAA92"
        isDesc={isDesc}
      />
      <ToolTipChip
        title="Entry Fee"
        label={`Rs. ${event?.entryFee}`}
        color="#AAC8A7"
        isDesc={isDesc}
      />
      <ToolTipChip
        title="Tournament Type"
        label={event?.tournamentType}
        color="#7895CB"
        isDesc={isDesc}
      />
      <ToolTipChip
        title="Players"
        label={`${event?.numberOfPlayers} A side`}
        color="#C3EDC0"
        isDesc={isDesc}
      />
      {isDesc ? (
        <>
          <ToolTipChip
            title="Game Time"
            label={`${event.gameTime} Min`}
            color="#96B6C5"
            isDesc={isDesc}
          />
          <ToolTipChip
            title="End Date"
            label={event?.endDate}
            color="#96B6C5"
            isDesc={isDesc}
          />
          <ToolTipChip
            title="Progress"
            label={event?.hasExpired ? "Completed" : "Ongoing"}
            color={"#A1CCD1"}
            isDesc={isDesc}
          />
        </>
      ) : null}
    </Stack>
  );
};
