import { Box, CircularProgress, Stack, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Stack alignItems="center" gap={2}>
        <CircularProgress disableShrink />
        <Typography variant="h3">FUTSA</Typography>
      </Stack>
    </Box>
  );
};

export default Loading;
