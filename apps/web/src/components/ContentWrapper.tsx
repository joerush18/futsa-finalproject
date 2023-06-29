"use client";
import React from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Color from "@/utils/color";

interface ContentWrapperProps {
  children: React.ReactNode;
  header: string;
}
const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  header,
}) => {
  return (
    <Card
      sx={{
        maxWidth: "600px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          my="28px"
          mx="24px"
        >
          <Typography variant="h3" color={Color.LightGray}>
            {header}{" "}
          </Typography>
          <Button variant="contained">
            <SummarizeIcon sx={{ marginRight: 2 }} /> Export in excel
          </Button>
        </Stack>
        <Divider />
      </CardContent>
      <Stack>{children}</Stack>
    </Card>
  );
};

export default ContentWrapper;
