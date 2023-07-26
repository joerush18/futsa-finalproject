import Color from "@/utils/color";
import { Box, Divider, Stack, Typography } from "@mui/material";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import { NOTIFICATION_TYPE } from "core";

interface INotificationContentProps {
  type: NOTIFICATION_TYPE;
  username: string;
  date: string;
  impDate: string;
  viewed: boolean;
}

const NotificationContent = ({
  type,
  username,
  date,
  impDate,
  viewed,
}: INotificationContentProps) => {
  const booked = type === NOTIFICATION_TYPE.BOOKING;

  return (
    <Stack
      flexDirection="row"
      gap={1}
      sx={{
        "&:hover": {
          backgroundColor: Color.grey[200],
          cursor: "pointer",
        },
        paddingY: 2,
        paddingX: 1,
        bgcolor: viewed ? Color.grey[200] : Color.grey[100],
      }}
    >
      {booked ? (
        <GppGoodRoundedIcon color="success" />
      ) : (
        <GppBadRoundedIcon color="error" />
      )}

      <Box>
        <Typography variant="body1" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="caption">
          has {type} for {impDate}.
        </Typography>
        <br />
        <Typography
          variant="caption"
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
