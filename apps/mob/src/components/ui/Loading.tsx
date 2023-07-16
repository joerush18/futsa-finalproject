import { Text, View, ActivityIndicator } from "react-native";
import React from "react";
import color from "../../assets/colors";

const Loading = () => {
  return (
    <View className="flex h-full m-auto">
      <ActivityIndicator size="large" color={color.primary} />
      <Text className=" text-primary font-bold text-center uppercase">
        FUTSA
      </Text>
    </View>
  );
};

export default Loading;
