import { View, Text } from "react-native";
import Avatar from "./ui/Avatar";
import { createRatingStars } from "../utils/star";

const Review = () => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center gap-3">
        <Avatar size={44} />
        {/* Avatar */}
        <View>
          {/* Name */}
          <Text className="font-bold text-grayText">Saroj Aryal</Text>
          {/* Stars */}
          <Text className="text-yellow text-xl font-bold">
            {createRatingStars()}
          </Text>
        </View>
      </View>
      {/* message */}
      <Text className="ml-11 opacity-70 text-grayText text-left">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro neque
        blanditiis ab architecto aliquid non aut expedita tempore quia at ut
        nemo id quis.
      </Text>
    </View>
  );
};

export default Review;
