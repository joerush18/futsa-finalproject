import { Text, View } from "react-native";
import React, { useState } from "react";
import Sectionlayout from "../../components/layout/Sectionlayout";
import { addTimeToDate } from "core";
import { TimeSlotComponent } from "./TimeSlotComponentProps";

interface TimeSlotProps {
  timeSlots: string[];
  setCurrentTimeSlot: React.Dispatch<React.SetStateAction<string | null>>;
  dateStatusMap: Map<string, string>;
  currentDate: Date;
}
export const TimeSlots = ({
  timeSlots,
  setCurrentTimeSlot,
  dateStatusMap,
  currentDate,
}: TimeSlotProps) => {
  const [selected, setSelected] = useState<number>(NaN);
  return (
    <Sectionlayout title="Select Available Time Slot">
      <View className="flex-row w-full flex-wrap items-center justify-between flex-2">
        {timeSlots.length ? (
          timeSlots.map((timeSlot, index) => {
            const isSelected = index === selected;
            const date = addTimeToDate(currentDate, timeSlot);
            const formattedDate = date.toString().split(" ").join("_");
            const status = dateStatusMap.get(formattedDate);
            return (
              <TimeSlotComponent
                key={`timeslot_${index}`}
                index={index}
                isSelected={isSelected}
                setSelected={setSelected}
                timeslot={timeSlot}
                setCurrentTimeSlot={setCurrentTimeSlot}
                status={status}
              />
            );
          })
        ) : (
          <Text>No timeslots available.</Text>
        )}
      </View>
    </Sectionlayout>
  );
};
