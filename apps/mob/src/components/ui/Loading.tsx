import { Text, View, ActivityIndicator } from "react-native";
import React from "react";
import color from "../../assets/colors";

const Loading = () => {
  return (
    <View className="flex h-full">
      <ActivityIndicator
        size="large"
        color={color.primary}
        className="m-auto"
      />
    </View>
  );
};

export default Loading;
