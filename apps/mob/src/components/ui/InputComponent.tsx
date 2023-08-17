import { TextInput, TextInputProps, Text, View } from "react-native";
import React from "react";
import { useController } from "react-hook-form";

interface InputComponentprops extends TextInputProps {
  label: string;
  secure?: boolean;
  control: any;
  name: string;
  error?: any;
}

const InputComponent = ({
  label,
  secure,
  control,
  name,
  error,
  ...props
}: InputComponentprops) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <View className="flex-col space-y-1">
      <TextInput
        value={field.value}
        className={`px-4 py-2 border-[1px]  ${
          error ? "border-red" : "border-gray-300"
        } rounded-md text-grayText text-sm mt-3`}
        placeholder={label}
        secureTextEntry={secure}
        onChangeText={field.onChange}
        {...props}
      />
      {error ? (
        <Text className="text-xs text-red ml-1 mt-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default InputComponent;
