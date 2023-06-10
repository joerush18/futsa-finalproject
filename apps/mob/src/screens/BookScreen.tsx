import { ScrollView, Text, View } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";

import { Entypo } from "@expo/vector-icons";
import Divider from "../components/ui/Divider";
import IconButton from "../components/ui/IconButton";
import Sectionlayout from "../components/layout/Sectionlayout";
import BookNowButton from "../components/ui/BookNowButton";
import { createRatingStars } from "../utils/star";
import {
  Days,
  MonthInfo,
  generateDaysForMonth,
  generateMonths,
  generateTimeSlots,
} from "../utils/date";

const BookScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Book a ground",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);

  const MONTHS = generateMonths();
  const [monthIndex, setMonthIndex] = useState<number>(0);

  const DAYS = generateDaysForMonth(MONTHS[monthIndex].value);
  const [selectedDay, setSelectedDay] = useState<Days>(DAYS[0]);

  const timeSlots = generateTimeSlots(
    +selectedDay.date,
    selectedDay.week,
    MONTHS[monthIndex].value + 1,
    8,
    24,
    60
  );
  console.log(timeSlots.timeSlots);
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
    <ScrollView className="pb-[10px]">
      <View className="p-4">
        <Text className="text-center text-xs">Select your timing</Text>
        <Text className="text-center font-bold text-xl">Hardik Futsal</Text>
        <Text className="text-yellow text-xl font-bold text-center">
          {createRatingStars()}
        </Text>
      </View>
      <Divider />
      <MonthSelector
        selectedMonth={MONTHS[monthIndex]}
        increaseMonthIndex={increaseMonthIndex}
        decreaseMonthIndex={decreaseMonthIndex}
      />
      <Divider />
      <WeekSlider
        days={DAYS}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
      />
      <Divider />
      <TimeSlots timeSlots={timeSlots.timeSlots} />
      <View className="mx-4 mr-6">
        <BookNowButton
          onPress={() => alert("Booking in progredss")}
          label="Book for Rs.1000"
          className="py-4"
        />
      </View>
    </ScrollView>
  );
};

export default BookScreen;

interface MonthSelectorProps {
  selectedMonth: MonthInfo;
  increaseMonthIndex: () => void;
  decreaseMonthIndex: () => void;
}
const MonthSelector = ({
  selectedMonth,
  increaseMonthIndex,
  decreaseMonthIndex,
}: MonthSelectorProps) => {
  return (
    <View className="flex-row justify-between mx-4 py-4 items-center">
      <Entypo
        name="chevron-left"
        size={24}
        color={color.grayText}
        onPress={() => decreaseMonthIndex()}
      />
      <Text className="text-primary font-bold">{selectedMonth.name}</Text>
      <Entypo
        name="chevron-right"
        size={24}
        color={color.grayText}
        onPress={() => increaseMonthIndex()}
      />
    </View>
  );
};

interface WeekSliderProps {
  days: Days[];
  selectedDay: Days;
  setSelectedDay: React.Dispatch<React.SetStateAction<Days>>;
}
const WeekSlider = ({ days, selectedDay, setSelectedDay }: WeekSliderProps) => {
  return (
    <ScrollView
      className="mx-4 py-2"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {days?.map((day, index) => {
        const { date, week } = day;
        const isSelected =
          selectedDay.date === date && selectedDay.week === week;
        return (
          <WeekComponent
            key={`weekDay_${index}`}
            index={index}
            isSelected={isSelected}
            setSelected={setSelectedDay}
            day={day}
          />
        );
      })}
    </ScrollView>
  );
};

interface WeekComponentProps {
  index: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<Days>>;
  day: Days;
}

const WeekComponent = ({
  index,
  isSelected,
  setSelected,
  day,
}: WeekComponentProps) => {
  const { date, week } = day;
  return (
    <IconButton
      onPress={() => setSelected(day)}
      className={`mx-1 p- min-w-[60px] ${
        isSelected ? "bg-primary text-white" : ""
      }`}
    >
      <Text
        className={`text-center font-bold text-lg ${
          isSelected ? "text-white" : ""
        }`}
      >
        {date}
      </Text>
      <Text
        className={`text-center font-bold text-gray-600  ${
          isSelected ? "text-white opcaity-100" : ""
        }`}
      >
        {week.slice(0, 3)}
      </Text>
    </IconButton>
  );
};
interface TimeSlotProps {
  timeSlots: string[];
}

const TimeSlots = ({ timeSlots }: TimeSlotProps) => {
  const [selected, setSelected] = useState<number>(0);
  return (
    <Sectionlayout title="Select Available Time Slot">
      <View className="flex-row w-full flex-wrap items-center justify-between flex-2">
        {timeSlots.map((timeSlot, index) => {
          const isSelected = index === selected;
          return (
            <TimeSlotComponent
              key={`timeslot_${index}`}
              index={index}
              isSelected={isSelected}
              setSelected={setSelected}
              timeslot={timeSlot}
            />
          );
        })}
      </View>
    </Sectionlayout>
  );
};

interface TimeSlotComponentProps {
  index: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  timeslot: string;
}
const TimeSlotComponent = ({
  index,
  isSelected,
  setSelected,
  timeslot,
}: TimeSlotComponentProps) => {
  return (
    <IconButton
      className={`px-5 py-4 rounded-2xl my-2 min-w-[170px] ${
        isSelected ? "bg-primary" : "bg-white"
      }`}
      onPress={() => setSelected(index)}
    >
      <Text
        className={`text-md font-bold text-center ${
          isSelected ? "text-white" : ""
        } `}
      >
        {timeslot}
      </Text>
    </IconButton>
  );
};
