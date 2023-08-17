import { Box, Typography } from "@mui/material";

export const LabelName = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <Box display="flex" alignItems="center" gap={1} mb={1}>
    <Typography variant="body2" fontWeight="bold">
      {label + ":"}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);
