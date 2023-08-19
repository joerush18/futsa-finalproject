import { View, TextInput } from "react-native";
import React, { LegacyRef, useEffect, useRef } from "react";
import { EvilIcons } from "@expo/vector-icons";

const SearchInput = ({
  setSearchText,
}: {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const inputRef: LegacyRef<TextInput> = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  });
  return (
    <View className="flex-row items-center justify-center">
      <View className=" rounded-xl flex-row items-center px-2 justify-between  bg-white mr-2 flex-1">
        <TextInput
          ref={inputRef}
          className="p-2 text-gray-500 flex-1"
          placeholder="Search futsals by name"
          onChange={(e) => {
            setSearchText(e.nativeEvent.text);
          }}
        />
        <EvilIcons name="search" size={24} color="black" />
      </View>
    </View>
  );
};

export default SearchInput;
