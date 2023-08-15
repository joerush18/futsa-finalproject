import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Color from "@/utils/color";
import { Box, Stack } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Stack
        direction="row"
        justifyItems="left"
        bgcolor={Color.background.default}
      >
        <Sidebar />
        <Box width="100%">
          <Navbar />
          <Box px={2} height="calc(100vh - 100px)" overflow="scroll">
            {<Outlet />}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Dashboard;
