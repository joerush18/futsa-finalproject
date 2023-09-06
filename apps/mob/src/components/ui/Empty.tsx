import React from "react";
import { View, Text, Image } from "react-native";

const emptyImage = require("../../assets/images/empty.png");

const Empty = ({ label }: { label?: string }) => {
  return (
    <>
      <View className="flex-col items-center h-40 mt-12 w-40">
        <Image
          source={emptyImage}
          style={{
            resizeMode: "stretch",
            height: "100%",
            width: "100%",
          }}
        />
        {label ? <Text className="text-center ">{label}</Text> : null}
      </View>
    </>
  );
};

export default Empty;
