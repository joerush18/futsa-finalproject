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
      justifyContent="flex-start"
      flexWrap="wrap"
    >
      <ToolTipChip
        title="Start Date"
        label={event?.eventDate}
        isDesc={isDesc}
      />
      <ToolTipChip title="End Date" label={event?.endDate} isDesc={isDesc} />
      <ToolTipChip
        title="Entry Fee"
        label={`Rs. ${event?.entryFee}`}
        isDesc={isDesc}
      />
      <ToolTipChip
        title="Tournament Type"
        label={event?.tournamentType}
        isDesc={isDesc}
      />
      <ToolTipChip
        title="Players"
        label={`${event?.numberOfPlayers} A side`}
        isDesc={isDesc}
      />
      {isDesc ? (
        <>
          <ToolTipChip
            title="Game Time"
            label={`${event.gameTime} Min`}
            isDesc={isDesc}
          />

          <ToolTipChip
            title="Progress"
            label={event?.hasExpired ? "Completed" : "Ongoing"}
            isDesc={isDesc}
          />
        </>
      ) : null}
    </Stack>
  );
};
