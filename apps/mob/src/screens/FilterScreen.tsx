import { View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";
import Divider from "../components/ui/Divider";

const FilterScreen = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView>
      <View className="px-6 pt-3 space-y-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-medium">Filter</Text>
          <Entypo
            name="cross"
            size={30}
            color="black"
            onPress={() => navigator.goBack()}
          />
        </View>
        <AddressBox />
        <Divider />
        <SliderComponent />
        <DistanceSlider />
        <Sortby />
        <Radios />
        <Divider />
        <View className="my-4">
          <BookNowButton
            label="Apply Filters"
            onPress={() => {}}
            className="py-4"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;

const AddressBox = () => {
  return (
    <View className="flex-row items-center justify-between py-2 rounded-sm ">
      <Text className="text-lg font-bold opacity-50">Address</Text>
      <Ionicons name="location" size={24} color={color.grayLight} />
    </View>
  );
};

import { Slider } from "@miblanchard/react-native-slider";
import { Pressable } from "react-native";
import BookNowButton from "../components/ui/BookNowButton";

const SliderComponent = () => {
  const [sliderValue, setSliderValue] = useState([400, 800]);
  return (
    <View>
      <View className="flex-row items-center justify-between mt-4 ">
        <Text className="text-md font-bold opacity-50">Price Range</Text>
        <Text className="text-md font-bold ">
          Rs {sliderValue[0]}/hr - Rs {sliderValue[1]}/hr
        </Text>
      </View>
      <Slider
        animateTransitions
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
        step={100}
        maximumValue={2000}
        minimumValue={200}
        thumbTintColor={color.primary}
        minimumTrackTintColor={color.primary}
      />
    </View>
  );
};

const DistanceSlider = () => {
  const [sliderValue, setSliderValue] = useState(8);

  return (
    <View>
      <View className="flex-row items-center justify-between mt-4 ">
        <Text className="text-md font-bold opacity-50">Distance</Text>
        <Text className="text-md font-bold ">Upto {sliderValue} kms</Text>
      </View>
      <Slider
        animateTransitions
        maximumTrackTintColor="#d3d3d3"
        maximumValue={15}
        minimumTrackTintColor="#1fb28a"
        minimumValue={1}
        step={2}
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value[0])}
        thumbTintColor="#1a9274"
      />
    </View>
  );
};

const Sortby = () => {
  return (
    <View>
      <Text className="text-md font-bold opacity-50">Sort by</Text>
      <View className="flex-row items-center mt-2">
        <ButtonComponent onPress={() => {}} label="Price" />
        <ButtonComponent onPress={() => {}} label="Distance" isSelected />
      </View>
    </View>
  );
};

interface ButtonComponentProps {
  label: string;
  onPress: () => void;
  isSelected?: boolean;
}
const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  onPress,
  isSelected,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`${
        !isSelected ? "bg-primary" : "bg-white border-primary border-[1px]"
      } px-6 py-4 rounded-md text-white mr-2 mb-4`}
    >
      <Text
        className={`font-bold ${isSelected ? "text-primary" : "text-white"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const Radios = () => {
  const [isEnabled, setEnabled] = useState(false);
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-lg font-bold opacity-50">High to Low</Text>
      <Switch
        trackColor={{ false: "#767577", true: color.primary }}
        thumbColor={isEnabled ? color.primary : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setEnabled((prev) => !prev)}
        value={isEnabled}
      />
    </View>
  );
};
