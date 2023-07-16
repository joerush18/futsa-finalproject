import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  format,
  startOfDay,
  addMinutes,
  isSameMonth,
  isAfter,
  endOfDay,
  isBefore,
  set,
  getDay,
} from "date-fns";

// Generate months from now to 1 year

export interface MonthInfo {
  name: string;
  value: number;
}

function generateMonths(): MonthInfo[] {
  const startDate = new Date();
  const endDate = addMonths(startDate, 12);

  const months: MonthInfo[] = [];
  let currentDate = startDate;

  while (currentDate < endDate) {
    const monthInfo: MonthInfo = {
      name: format(currentDate, "MMMM"),
      value: currentDate.getMonth(),
    };
    months.push(monthInfo);
    currentDate = addMonths(currentDate, 1);
  }

  return months;
}

export interface Days {
  date: string;
  week: string;
  month: string;
}
function generateDaysForMonth(month: number): Days[] {
  const today = new Date();
  const startDate = startOfMonth(new Date(today.getFullYear(), month));
  const endDate = endOfMonth(startDate);

  const days: Days[] = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).map((date) => {
    return {
      date: format(date, "d"),
      week: format(date, "EEEE"),
      month: format(date, "MMMM"),
    };
  });

  if (isSameMonth(today, startDate)) {
    const todayIndex = today.getDate() - startDate.getDate();
    days.splice(0, todayIndex);
  }

  return days;
}

export interface TimeSlot {
  date: string;
  week: string;
  month: string;
  timeSlots: string[];
}

function generateTimeSlots(
  date: Date,
  week: string,
  month: number,
  openingHour: number,
  closingHour: number,
  interval: number
): TimeSlot {
  openingHour = Math.round(openingHour);

  const timeSlots = [];
  const now = new Date();
  const today = startOfDay(now);
  const end = new Date(today.getTime() + closingHour * 60 * 60 * 1000); // Convert closingHour to milliseconds

  const start = new Date(today.getTime() + openingHour * 60 * 60 * 1000); // Convert openingHour to milliseconds
  let currentTime = date.getTime() === today.getTime() ? now : start;

  // Start timeslot rounding off to 0
  const remainder = currentTime.getMinutes() % interval;
  if (remainder !== 0) {
    currentTime = addMinutes(currentTime, interval - remainder);
  }

  while (isBefore(currentTime, end)) {
    // Exclude the timeslots for today
    if (currentTime.getTime() !== now.getTime()) {
      timeSlots.push(format(currentTime, "hh:mm a"));
    }
    currentTime = addMinutes(currentTime, interval);
  }

  return {
    date: date.toLocaleDateString("en-US"),
    week,
    month: month.toString(),
    timeSlots,
  };
}

function getDateByDayAndMonth(dayOfWeek, month, year) {
  const date = set(new Date(year, month - 1), { date: dayOfWeek });
  return startOfDay(date);
}

function addTimeToDate(date, time) {
  const timeRegex = /^(0?[1-9]|1[0-2]):([0-5]\d) (AM|PM)$/i;
  if (!timeRegex.test(time)) {
    throw new Error("Invalid time format. Use hh:mm AM/PM.");
  }

  const [hoursStr, minutesStr, period] = time.match(timeRegex).slice(1);
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
}

function convertToAmPm(time) {
  const [hours, minutes] = time.split(":").map(Number);

  let period = "AM";
  let formattedHours = hours;

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      formattedHours = hours - 12;
    }
  }

  return `${formattedHours} ${period}`;
}

export {
  generateDaysForMonth,
  generateMonths,
  generateTimeSlots,
  getDateByDayAndMonth,
  addTimeToDate,
  convertToAmPm,
};
