import Loading from "@/components/Loading";
import DHeader from "@/components/dashboard/DHeader";
import useBookings from "@/hooks/useBookings";
import { Box } from "@mui/material";

const HomePage = () => {
  const { bookings, fetchingData } = useBookings();

  if (fetchingData) {
    <Loading />;
  }
  return (
    <Box
      sx={{
        paddingY: "20px",
        height: "105%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <DHeader />
      <br />
    </Box>
  );
};

export default HomePage;
