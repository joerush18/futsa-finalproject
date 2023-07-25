import Loading from "@/components/Loading";
import { Box, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import useBookings from "@/hooks/useBookings";
import BookingsTable from "@/components/BookingsTable";
import { BOOKING_STATUS } from "core";
import { Refresh } from "@mui/icons-material";

const BookingPage = () => {
  const { fetchingData, bookingsByStatus, refetch } = useBookings();

  if (fetchingData) {
    return <Loading />;
  }
  return (
    <Box
      sx={{
        paddingY: "10px",
        height: "105%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" marginBottom={2}>
          Pending Bookings
        </Typography>
        <Chip
          label="Refresh"
          onClick={() => refetch()}
          icon={fetchingData ? <CircularProgress size={20} /> : <Refresh />}
          variant="outlined"
        />
      </Stack>
      <Box>
        <BookingsTable
          bookings={bookingsByStatus.pendings}
          type={BOOKING_STATUS.PENDING}
        />
      </Box>
      <br />
      <Typography variant="h6" marginBottom={2}>
        Accepted Bookings
      </Typography>
      <Box>
        <BookingsTable
          bookings={bookingsByStatus.upComings}
          type={BOOKING_STATUS.BOOKED}
        />
      </Box>
      <br />
      <Typography variant="h6" marginBottom={2}>
        Rejected bookings
      </Typography>
      <Box>
        <BookingsTable
          bookings={bookingsByStatus.rejected}
          type={BOOKING_STATUS.REJECTED}
        />
      </Box>
    </Box>
  );
};

export default BookingPage;
