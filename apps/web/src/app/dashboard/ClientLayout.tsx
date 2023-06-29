"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Box, Stack } from "@mui/material";
import React, { ReactNode } from "react";

const ClientLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Stack direction="row" justifyItems="left">
      <Box>
        <Sidebar />
      </Box>
      <Box width={"100%"}>
        <Navbar />
        <Box p={2}>{children}</Box>
      </Box>
    </Stack>
  );
};

export default ClientLayout;
