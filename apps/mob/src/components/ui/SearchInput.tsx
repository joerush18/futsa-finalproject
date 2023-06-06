import { View, TextInput } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import IconButton from "./IconButton";
import { useNavigation } from "@react-navigation/native";

const SearchInput = () => {
  const navigator = useNavigation()
  return (
    <View className="flex-row items-center justify-center">
      <View className=" rounded-xl flex-row items-center px-2 justify-between  bg-white mr-2 flex-1">
        <TextInput
          className="p-2 text-gray-500 flex-1"
          placeholder="Search futsals by name"
        />
        <EvilIcons name="search" size={24} color="black" />
      </View>
      <IconButton
        onPress={() => {
          navigator.navigate("Filter" as never)
        }}
      >
        <AntDesign name="filter" size={24} color="black" />
      </IconButton>
    </View>
  );
};

export default SearchInput;
