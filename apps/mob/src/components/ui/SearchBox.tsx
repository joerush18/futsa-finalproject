import { Text } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchBox = () => {
  const navigation = useNavigation();
  const onSearchPress = () => {
    navigation.navigate("Search" as never);
  };
  return (
    <Pressable
      className=" rounded-xl flex-row items-center justify-between px-2 bg-white w-full"
      onPress={onSearchPress}
    >
      <Text className="p-3  text-gray-500">Search futsals by name.</Text>
      <EvilIcons name="search" size={24} color="black" />
    </Pressable>
  );
};

export default SearchBox;
