import DHeader from "@/components/dashboard/DHeader";
import { Box } from "@mui/material";
import CalenderView from "../auth/components/CalenderView";

const HomePage = () => {
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
      <CalenderView />
    </Box>
  );
};

export default HomePage;
