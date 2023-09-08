import Color from "@/utils/color";
import { Box, Divider, Stack, Typography } from "@mui/material";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { NOTIFICATION_TYPE } from "core";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface INotificationContentProps {
  type: NOTIFICATION_TYPE;
  username: string;
  date: string;
  description: string;
  viewed: boolean;
  onClick: () => void;
  collectionId: string;
}

const NotificationContent = ({
  type,
  date,
  description,
  viewed,
  onClick,
  collectionId,
}: INotificationContentProps) => {
  const booked = type === NOTIFICATION_TYPE.BOOKING;
  const payment = type === NOTIFICATION_TYPE.PAYMENT;
  const events = type === NOTIFICATION_TYPE.EVENT;
  const requests = type === NOTIFICATION_TYPE.REQUESTS;

  return (
    <Stack
      onClick={onClick}
      flexDirection="row"
      alignItems="center"
      gap={2}
      sx={{
        "&:hover": {
          backgroundColor: Color.grey[200],
          cursor: "pointer",
        },
        paddingY: 2,
        paddingX: 1,
        bgcolor: viewed ? Color.grey[100] : Color.grey[200],
      }}
    >
      {booked ? (
        <SportsSoccerIcon
          color="warning"
          sx={{
            fontSize: 32,
          }}
        />
      ) : payment ? (
        <ReceiptIcon
          color="primary"
          sx={{
            fontSize: 32,
          }}
        />
      ) : events ? (
        <EventIcon
          color="secondary"
          sx={{
            fontSize: 32,
          }}
        />
      ) : requests ? (
        <AssignmentIcon
          color="warning"
          sx={{
            fontSize: 32,
          }}
        />
      ) : (
        <GppBadRoundedIcon color="error" />
      )}

      <Box>
        <Typography variant="caption">{description} </Typography>
        <Typography
          lineHeight={2}
          fontSize="10px"
          color={viewed ? Color.grey[700] : Color.secondary.focus}
        >
          #{collectionId}
        </Typography>
        <Typography
          lineHeight={1}
          fontSize="10px"
          color={viewed ? Color.grey[700] : Color.primary.focus}
        >
          {date}
        </Typography>
      </Box>
      <Divider />
    </Stack>
  );
};

export default NotificationContent;
