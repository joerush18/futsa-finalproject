import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  format,
  startOfDay,
  addMinutes,
  isSameMonth,
  set,
  isAfter,
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
  date: number,
  week: string,
  month: number,
  openingHour: number,
  closingHour: number,
  interval: number
): TimeSlot {
  const currentYear = new Date().getFullYear();
  const selectedDate = set(new Date(currentYear, month - 1, date), {
    hours: openingHour,
    minutes: 0,
  });

  const startTime = startOfDay(selectedDate);
  const endTime = set(selectedDate, { hours: closingHour });

  const timeSlots = [];
  let currentTimeSlot = startTime;

  while (isAfter(currentTimeSlot, new Date()) && currentTimeSlot <= endTime) {
    const formattedTimeSlot = format(currentTimeSlot, "h:mm");
    const finalTimeSlot =
      formattedTimeSlot +
      "-" +
      format(addMinutes(currentTimeSlot, interval), "h:mm a");
    timeSlots.push(finalTimeSlot);
    currentTimeSlot = addMinutes(currentTimeSlot, interval);
  }

  return {
    date: date.toString(),
    week,
    month: month.toString(),
    timeSlots,
  };
}

export { generateDaysForMonth, generateMonths, generateTimeSlots };
