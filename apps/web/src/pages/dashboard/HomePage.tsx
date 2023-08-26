import Loading from "@/components/Loading";
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
        paddingY: "10px",
        height: "100%",
        overflowY: "scroll",
        width: "full",
        scrollbarWidth: "none",
      }}
    >
      {/* Commented for now because of no use */}
      {/* <DHeader />
      <br /> */}
      <CalenderView
        dateStatusMap={DateStatusMap}
        refresh={refetch}
        fetchingData={fetchingData}
      />
    </Box>
  );
};

export default HomePage;
