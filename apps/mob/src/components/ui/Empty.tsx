import React from "react";
import { View, Text, Image } from "react-native";

const emptyImage = require("../../assets/images/empty.png");

const Empty = ({ label }: { label?: string }) => {
  return (
    <>
      <View className="flex-col items-center h-80 mt-12 w-80">
        <Image
          source={emptyImage}
          style={{
            resizeMode: "stretch",
            height: "100%",
            width: "100%",
          }}
        />
      </View>
      {label ? <Text className="text-center ">{label}</Text> : null}
    </>
  );
};

export default Empty;
