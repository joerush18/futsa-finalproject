"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Color from "@/utils/color";
import { Box, Stack } from "@mui/material";
import React, { ReactNode } from "react";

const ClientLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Stack
      direction="row"
      justifyItems="left"
      bgcolor={Color.background.default}
    >
      <Sidebar />
      <Box width="100%" height="100vh" p={2}>
        <Navbar />
        <Box p={2}>{children}</Box>
      </Box>
    </Stack>
  );
};

export default ClientLayout;
