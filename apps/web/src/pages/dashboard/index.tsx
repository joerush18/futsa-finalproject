import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Color from "@/utils/color";
import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <Stack
      direction="row"
      justifyItems="left"
      bgcolor={Color.background.default}
    >
      <Sidebar />
      <Box width="100%" height="100vh" p={2}>
        <Navbar />
        <Box p={2}>{<Outlet />}</Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
