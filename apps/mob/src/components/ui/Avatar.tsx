import { Image } from "react-native";
import React from "react";
import color from "../../assets/colors";

const Avatar = ({ size = 65 }: { size?: number }) => {
  return (
    <Image
      source={{ uri: "https://avatars.githubusercontent.com/u/55552872?v=4" }}
      className={`rounded-full mt-4`}
      style={{
        borderWidth: 2,
        borderColor: color.background,
        width: size,
        height: size,
      }}
    />
  );
};

export default Avatar;
