import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IRequest, REQUEST_STATUS, formatBookingDate, timeAgo } from "core";

export const RequestCard = ({ request }: { request: IRequest }) => {
  const {
    title,
    description,
    createdAt,
    budget,
    id,
    status,
    location,
    deadline,
  } = request;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate("Request-Detail", { requestId: id });
      }}
    >
      <View
        className={`py-3 border-[1px]  mx-2 my-2 rounded-sm ${
          status === REQUEST_STATUS.ACCEPTED
            ? "border-primary/30"
            : "border-gray-300"
        }`}
      >
        <View className="mx-5">
          <Text className="font-bold text-md">{title}</Text>
          <View className="flex-row items-center my-1">
            <Text className="text-gray-400 font-bold">{location} , </Text>
            <Text className="font-bold text-sm text-gray-400">
              {" "}
              Budget : Rs. {budget} ,{" "}
            </Text>
            <Text className="font-bold text-sm text-gray-400">
              Deadline : {formatBookingDate(deadline).split(",")[0]}
            </Text>
          </View>
          <Text className=" text-gray-600">
            {description.replace(/\s+/g, " ").slice(0, 98)} ...
          </Text>

          <View className="flex-row justify-between items-center mt-2">
            <Text className=" text-gray-400 text-left">
              {timeAgo(createdAt)}
            </Text>
            <Text className=" mt-1 text-left font-bold text-primaryLight">
              {description.length > 100 ? "View more" : ""}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
