"use client";

import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Box, Divider } from "@mui/material";
import Color from "@/utils/color";
import IconBox from "../ui/IconBox";

interface FsCardProps {
  icon: React.ReactNode;
  boxColor: string;
  label: string;
  value: string;
  remark: string;
  remarkValue?: string;
}

const FsCard = ({
  icon,
  boxColor,
  label,
  value,
  remark,
  remarkValue,
}: FsCardProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "300px",
      }}
    >
      <Card>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          m={1}
        >
          <Box>
            <Typography variant="body1">{label}</Typography>
            <Typography variant="h5" textAlign="right">
              {value}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack direction="row" gap={1} py={2} px={1} alignItems="center">
          <Typography variant="body2" color={Color.success.main}>
            {remarkValue}
          </Typography>
          <Typography variant="body1">{remark}</Typography>
        </Stack>
      </Card>
      <Box
        sx={{
          position: "absolute",
          top: "-15px",
          left: "20px",
          zIndex: 1,
        }}
      >
        <IconBox color={boxColor} icon={icon} />
      </Box>
    </Box>
  );
};

export default FsCard;
