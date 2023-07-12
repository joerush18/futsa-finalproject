import DHeader from "@/components/dashboard/DHeader";
import Color from "@/utils/color";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import {
  Days,
  generateDaysForMonth,
  generateMonths,
  generateTimeSlots,
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

  const TIME_SLOTS = generateTimeSlots(
    +selectedDay.date,
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
          padding: "2rem",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          mb={2}
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
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            height: "100%",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {TIME_SLOTS.timeSlots.length ? (
            TIME_SLOTS.timeSlots.map((timeSlot) => (
              <Button key={timeSlot} onClick={() => {}}>
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
