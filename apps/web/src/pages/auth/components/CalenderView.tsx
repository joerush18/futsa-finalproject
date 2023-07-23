import useUserStore from "@/store/useUserStore";
import Color from "@/utils/color";
import {
  Box,
  Button,
  Card,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import {
  BOOKING_STATUS,
  Days,
  addTimeToDate,
  generateDaysForMonth,
  generateMonths,
  generateTimeSlots,
  getDateByDayAndMonth,
} from "core";
import { useEffect } from "react";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useState } from "react";
interface CalenderViewProps {
  dateStatusMap: Map<string, string>;
  refresh: () => void;
}

const CalenderView = ({ dateStatusMap, refresh }: CalenderViewProps) => {
  const { futsal } = useUserStore();
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
    +futsal.openTime.split(":")[0],
    +futsal.closeTime.split(":")[0],
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

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  useEffect(() => {
    setTabValue(0);
    setSelectedDay(DAYS[0]);
  }, [monthIndex]);

  return (
    <Box>
      <Card
        sx={{
          width: "100%",
          display: "grid",
          placeItems: "center",
          p: 2,
        }}
      >
        <IconButton onClick={refresh}>
          <RefreshIcon />
        </IconButton>
        <Box marginTop={2}>
          <Typography variant="h6" textAlign="center">
            Available slots for {selectedDay.month} {selectedDay.date} , 2023
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Please choose an available time
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          width="300px"
        >
          <Button onClick={decreaseMonthIndex}>
            <ArrowCircleLeftIcon />
          </Button>
          <Typography variant="h5">{MONTHS[monthIndex].name}</Typography>
          <Button onClick={increaseMonthIndex}>
            <ArrowCircleRightIcon />
          </Button>
        </Box>
        <Box
          sx={{
            maxWidth: "72vw",
            bgcolor: "background.paper",
          }}
        >
          <Box width="100%">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="visible arrows tabs example"
              key={`tabs_${tabValue}`}
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  backgroundColor: Color.primary.main,
                  color: Color.white.main,
                },

                "& .MuiTabs-flexContainer": {
                  gap: "12px",
                },
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {DAYS.map((day, index) => (
                <Tab
                  onClick={() => setSelectedDay(day)}
                  key={`tabs-${index}`}
                  icon={<Typography variant="h6">{day.date}</Typography>}
                  label={day.week.slice(0, 3)}
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 2,
                    border: 1,
                    borderColor: Color.primary.main,
                    color: Color.primary.main,
                  }}
                  value={index}
                />
              ))}
            </Tabs>
          </Box>
          <Box
            display="grid"
            sx={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              mt: 2,
            }}
          >
            {TIME_SLOTS.timeSlots.length ? (
              TIME_SLOTS.timeSlots.map((timeSlot) => {
                const date = addTimeToDate(currentDate, timeSlot);
                const formattedDate = date
                  .toString()
                  .split(" ")
                  .slice(0, -2)
                  .join("_");
                const status = dateStatusMap.get(formattedDate);
                const isBooked = status === BOOKING_STATUS.BOOKED;
                const isPending = status === BOOKING_STATUS.PENDING;

                return (
                  <Button
                    key={timeSlot}
                    variant={isBooked || isPending ? "text" : "outlined"}
                    onClick={() => {
                      console.log("Hello");
                    }}
                    sx={{
                      margin: "0.5rem",
                      px: 4,
                      py: 2,
                      fontWeight: "bold",
                      borderRadius: 2,
                      color:
                        isBooked || isPending
                          ? Color.white.focus
                          : Color.primary.main,
                      bgcolor: isPending
                        ? Color.gradients.warning.state
                        : isBooked
                        ? Color.success.main
                        : Color.transparent,
                      ":disabled": {
                        color: Color.white.main,
                      },
                    }}
                    disabled={isBooked || isPending}
                  >
                    {timeSlot}
                  </Button>
                );
              })
            ) : (
              <Typography
                variant="h5"
                textAlign="center"
                color={Color.dark.focus}
              >
                No time slots available
              </Typography>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default CalenderView;
