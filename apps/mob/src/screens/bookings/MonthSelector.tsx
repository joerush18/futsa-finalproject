import { Text, View } from "react-native";
import React from "react";
import color from "../../assets/colors";
import { Entypo } from "@expo/vector-icons";
import { MonthInfo } from "core";

interface MonthSelectorProps {
  selectedMonth: MonthInfo;
  increaseMonthIndex: () => void;
  decreaseMonthIndex: () => void;
}
export const MonthSelector = ({
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
