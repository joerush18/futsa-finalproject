import { View, TextInput, TextInputProps } from "react-native";
import React from "react";

interface InputComponentprops {
  label: string;
  secure?: boolean;
}

const InputComponent = ({ label, secure }: InputComponentprops) => {
  return (
    <TextInput
      className="px-4 py-2 border-[1px] border-gray-300 rounded-md text-grayText text-sm mt-3"
      placeholder={label}
      secureTextEntry={secure}
    />
  );
};

export default InputComponent;
