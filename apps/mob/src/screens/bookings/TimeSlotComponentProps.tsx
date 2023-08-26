import { Text } from "react-native";
import React from "react";
import IconButton from "../../components/ui/IconButton";
import { BOOKING_STATUS } from "core";

interface TimeSlotComponentProps {
  index: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  timeslot: string;
  setCurrentTimeSlot: React.Dispatch<React.SetStateAction<string | null>>;
  status?: string;
}
export const TimeSlotComponent = ({
  index,
  isSelected,
  setSelected,
  timeslot,
  setCurrentTimeSlot,
  status,
}: TimeSlotComponentProps) => {
  const isBooked = status === BOOKING_STATUS.BOOKED;
  const isPending = status === BOOKING_STATUS.PENDING;
  return (
    <IconButton
      className={`px-5 py-4 rounded-2xl my-2 min-w-[170px] ${
        isPending
          ? "bg-yellow disabled"
          : isBooked
          ? "bg-green-600 disabled"
          : isSelected
          ? "bg-primary"
          : ""
      }`}
      onPress={() => {
        setCurrentTimeSlot((prev) => {
          if (prev === timeslot) {
            setSelected(NaN);
            return null;
          }
          return timeslot;
        });
        setSelected(index);
      }}
      disabled={isBooked || isPending}
    >
      <Text
        className={`text-md font-bold text-center ${
          isPending || isBooked || isSelected
            ? "text-white disabled"
            : isSelected
            ? "bg-primary"
            : ""
        } `}
      >
        {timeslot}
      </Text>
    </IconButton>
  );
};
