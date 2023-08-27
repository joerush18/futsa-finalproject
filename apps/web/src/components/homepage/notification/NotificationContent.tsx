import Color from "@/utils/color";
import { Box, Divider, Stack, Typography } from "@mui/material";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { NOTIFICATION_TYPE } from "core";

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
  username,
  date,
  description,
  viewed,
  onClick,
  collectionId,
}: INotificationContentProps) => {
  const booked = type === NOTIFICATION_TYPE.BOOKING;
  const payment = type === NOTIFICATION_TYPE.PAYMENT;

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
        <PendingActionsIcon
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
