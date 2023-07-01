"use client";

import { Box, Typography } from "@mui/material";

interface AuthClientWrapperProps {
  title: string;
  children: React.ReactNode;
  subtitle: string;
}

const AuthClientWrapper = ({
  title,
  subtitle,
  children,
}: AuthClientWrapperProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        bgcolor="black"
        sx={{
          height: "100%",
          width: "100%",
        }}
      ></Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeItems: "center",
          padding: 16,
        }}
      >
        <Box
          sx={{
            width: "350px",
          }}
        >
          <Typography variant="h3">{title}</Typography>
          <Typography marginBottom={4}>{subtitle}</Typography>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default AuthClientWrapper;
