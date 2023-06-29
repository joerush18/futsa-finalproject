"use client";

import Color from "@/utils/color";
import { Stack, Typography, Divider, Avatar, styled } from "@mui/material";
import React from "react";
import Image from "next/image";
import ContentWrapper from "./ContentWrapper";

const BookingComponent = () => {
  return (
    <>
      <ContentWrapper header="Bookings">
        <Booking />
        <Booking />
        <Booking />
      </ContentWrapper>
    </>
  );
};

export default BookingComponent;

const Booking = () => {
  const SpanText = styled("span")({
    fontWeight: "bold",
  });

  const SpanTextLight = styled("span")({
    color: Color.LightGray,
  });

  const CancelText = styled("span")({
    color: Color.Red,
  });

  return (
    <>
      <Stack direction="row" alignItems="center" mx="16px" my="12px" gap={3}>
        <Avatar alt="Joey Rush" sx={{ width: 50, height: 50 }} />
        <Typography variant="subtitle2">
          <SpanText className="bold-text">Saroj Aryal</SpanText> booked on{" "}
          <SpanText>Monday 15 November 2023 </SpanText> from{" "}
          <SpanText>9:00 am</SpanText> to <SpanText>10:00 am</SpanText> <br />
          <CancelText>booked on 11-14-2021 12:05 pm</CancelText>
        </Typography>
        <Image
          src="/arenafutsal.jpg"
          height={70}
          width={70}
          alt="Futsal Image"
        />
      </Stack>
      <Divider />
    </>
  );
};
