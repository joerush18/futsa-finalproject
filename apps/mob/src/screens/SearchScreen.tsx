import { View } from "react-native";
import React, { useLayoutEffect } from "react";
import SearchInput from "../components/ui/SearchInput";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";

const SearchScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "All futsals",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);
  return (
    <View
      className="flex-col items-start justify-center p-4"
      style={{
        backgroundColor: color.primary,
      }}
    >
      <SearchInput />
    </View>
  );
};

export default SearchScreen;
