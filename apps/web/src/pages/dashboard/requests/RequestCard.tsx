import Color from "@/utils/color";
import { Box, Stack, Typography } from "@mui/material";
import { IRequest, REQUEST_STATUS, formatBookingDate, timeAgo } from "core";
import { ToolTipChip } from "../events/ToolTipChip";

export const RequestCard = ({
  request,
  onOpen,
  setSelected,
}: {
  request: IRequest;
  onOpen: () => void;
  setSelected: React.Dispatch<React.SetStateAction<IRequest>>;
}) => {
  const borderColor = `1px solid ${Color.grey[300]}`;

  const {
    title,
    budget,
    deadline,
    description,
    endDate,
    location,
    startDate,
    status,
    createdAt,
    createdBy,
  } = request;
  return (
    <Box
      sx={{
        borderBottom: borderColor,
        bgcolor: Color.grey[100],
        padding: 4,
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          backgroundColor: Color.grey[200],
        },
      }}
      onClick={() => {
        setSelected(request);
        onOpen();
      }}
    >
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <Stack flexDirection="row" gap={1} color={Color.text.main}>
        <Typography variant="caption">{location} -</Typography>
        <Typography variant="caption">Budget : Rs {budget} -</Typography>
        <Typography variant="caption">
          Deadline : {formatBookingDate(deadline.toString()).split(",")[0]}
        </Typography>
      </Stack>

      <Typography variant="caption">{description}</Typography>
      <Stack flexDirection="row" mb={2}>
        <ToolTipChip
          title="Start Date"
          label={formatBookingDate(startDate.toString()).split(",")[0]}
          color="#7EAA92"
          isDesc={true}
        />
        <ToolTipChip
          title="End Date"
          label={formatBookingDate(endDate.toString()).split(",")[0]}
          color="#7EAA92"
          isDesc={true}
        />
      </Stack>
      <Typography variant="caption" color={Color.text.main}>
        {timeAgo(createdAt)} - {createdBy?.name}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          bgcolor:
            status === REQUEST_STATUS.ACTIVE
              ? Color.warning.main
              : status === REQUEST_STATUS.ACCEPTED
              ? Color.success.main
              : Color.error.main,
          color: "white",
          px: 2,
          py: 1,
          borderRadius: 4,
          fontWeight: "bold",
          position: "absolute",
          top: 8,
          right: 6,
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};
