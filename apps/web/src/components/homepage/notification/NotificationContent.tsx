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
  onClick: () => void;
}

const NotificationContent = ({
  type,
  username,
  date,
  impDate,
  viewed,
  onClick,
}: INotificationContentProps) => {
  const booked = type === NOTIFICATION_TYPE.BOOKING;

  return (
    <Stack
      onClick={onClick}
      flexDirection="row"
      gap={1}
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
        <GppGoodRoundedIcon
          color="warning"
          sx={{
            fontSize: 30,
          }}
        />
      ) : (
        <GppBadRoundedIcon color="error" />
      )}

      <Box>
        <Typography variant="body2" fontWeight="bold" lineHeight={0.5}>
          {username}
        </Typography>
        <Typography variant="caption" lineHeight={0.8}>
          has {type} for{" "}
          <Typography fontWeight="bold" variant="caption" lineHeight={1}>
            {impDate}
          </Typography>
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
