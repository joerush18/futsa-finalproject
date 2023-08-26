import { Text } from "react-native";
import React from "react";
import IconButton from "../../components/ui/IconButton";
import { Days } from "core";

interface WeekComponentProps {
  index: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<Days>>;
  day: Days;
}

export const WeekComponent = ({
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
