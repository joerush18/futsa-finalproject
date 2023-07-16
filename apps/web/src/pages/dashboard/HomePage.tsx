import DHeader from "@/components/dashboard/DHeader";
import Color from "@/utils/color";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import {
  Days,
  addTimeToDate,
  generateDaysForMonth,
  generateMonths,
  generateTimeSlots,
  getDateByDayAndMonth,
} from "core/utils/date";
import { useState } from "react";

const HomePage = () => {
  return (
    <Box width="full">
      <DHeader />
      <br />
      <CalenderView />
    </Box>
  );
};

export default HomePage;

const CalenderView = () => {
  const MONTHS = generateMonths();
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const DAYS = generateDaysForMonth(MONTHS[monthIndex].value);
  const [selectedDay, setSelectedDay] = useState<Days>(DAYS[0]);

  const currentDate = getDateByDayAndMonth(
    selectedDay.date,
    MONTHS[monthIndex].value + 1,
    "2023"
  );

  const TIME_SLOTS = generateTimeSlots(
    currentDate,
    selectedDay.week,
    MONTHS[monthIndex].value + 1,
    8,
    20,
    60
  );

  function increaseMonthIndex() {
    setMonthIndex((prev) => {
      if (prev === 11) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }
  function decreaseMonthIndex() {
    setMonthIndex((prev) => {
      if (prev === 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  }
  return (
    <Stack direction="row" gap={4}>
      <Card
        sx={{
          minWidth: "full",
          padding: "1.5rem",
        }}
      >
        <Typography variant="h3" color={Color.black} textAlign="center">
          Select a date
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          mb={2}
          gap={4}
        >
          <Button onClick={decreaseMonthIndex}>Prev</Button>
          <Typography variant="h5">{MONTHS[monthIndex].name}</Typography>
          <Button onClick={increaseMonthIndex}>Next</Button>
        </Box>
        <Box>
          {DAYS.map((day) => (
            <Button
              key={day.date}
              onClick={() => setSelectedDay(day)}
              sx={{
                borderRadius: "100%",
                height: "3rem",
                width: "3rem",
                color: day.date === selectedDay.date ? "white" : "black",
                backgroundColor:
                  day.date === selectedDay.date ? Color.primary.main : "white",
              }}
            >
              {day.date}
            </Button>
          ))}
        </Box>
      </Card>
      <Card
        sx={{
          minWidth: "50%",
          padding: "1.5rem",
        }}
      >
        <Typography variant="h3" textAlign="center">
          Slots available
        </Typography>

        <Box
          sx={{
            display: "grid",
            placeItems: "flex-start",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {TIME_SLOTS.timeSlots.length ? (
            TIME_SLOTS.timeSlots.map((timeSlot) => (
              <Button
                key={timeSlot}
                onClick={() => {
                  const date = addTimeToDate(currentDate, timeSlot);
                  console.log(date);
                }}
                variant="contained"
                sx={{
                  margin: "0.5rem",
                }}
              >
                {timeSlot}
              </Button>
            ))
          ) : (
            <Typography variant="h5">No time slots available</Typography>
          )}
        </Box>
      </Card>
    </Stack>
  );
};
