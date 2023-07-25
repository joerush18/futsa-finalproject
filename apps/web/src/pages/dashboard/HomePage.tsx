import Loading from "@/components/Loading";
import DHeader from "@/components/dashboard/DHeader";
import useBookings from "@/hooks/useBookings";
import { Box } from "@mui/material";
import CalenderView from "../auth/components/CalenderView";

const HomePage = () => {
  const { fetchingData, DateStatusMap, refetch } = useBookings();

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
      <CalenderView
        dateStatusMap={DateStatusMap}
        refresh={refetch}
        fetchingData={fetchingData}
      />
    </Box>
  );
};

export default HomePage;
