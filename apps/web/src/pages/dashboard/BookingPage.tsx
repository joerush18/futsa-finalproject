import Loading from "@/components/Loading";
import { Box } from "@mui/material";
import CalenderView from "../auth/components/CalenderView";
import useBookings from "@/hooks/useBookings";

const BookingPage = () => {
  const { fetchingData, DateStatusMap, refetch } = useBookings();

  if (fetchingData) {
    return <Loading />;
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
      <CalenderView dateStatusMap={DateStatusMap} refresh={refetch} />
    </Box>
  );
};

export default BookingPage;
