import { ScrollView } from "react-native";
import React from "react";
import { Days } from "core";
import { WeekComponent } from "./WeekComponentProps";

interface WeekSliderProps {
  days: Days[];
  selectedDay: Days;
  setSelectedDay: React.Dispatch<React.SetStateAction<Days>>;
}
export const WeekSlider = ({
  days,
  selectedDay,
  setSelectedDay,
}: WeekSliderProps) => {
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
