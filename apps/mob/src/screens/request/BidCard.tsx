import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { IBids, REQUEST_STATUS, timeAgo } from "core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";

export const BidCard = ({
  bid,
  handleClick,
  status,
}: {
  bid: IBids;
  handleClick?: (bid: IBids) => void;
  status: REQUEST_STATUS;
}) => {
  const {
    createdBy,
    createdAt,
    message,
    budget,
    venue,
    freebies,
    updatedAt,
    isSelected,
  } = bid;

  return (
    <View className="bg-primaryLight/30 rounded-md p-4 border-[1px] border-gray-300 relative mt-3">
      {/* Status */}
      {isSelected ? (
        <MaterialCommunityIcons
          name="check-circle"
          size={24}
          color="green"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        />
      ) : null}
      <View className="flex-row space-x-3 items-center">
        <Avatar label={createdBy?.name.slice(0, 2)} size={48} />
        <View>
          <Text className="text-gray-700 text-md font-bold">
            {createdBy?.name}
          </Text>
          <Text className="text-gray-500 text-md">{createdBy?.email}</Text>
        </View>
      </View>
      <Text className="text-gray-700">{message}</Text>
      {/* icons */}
      <View className="flex-row items-center justify-between mt-2">
        <Text className="font-bold text-lg">RS. {budget}</Text>
        <View className="flex-row items-center space-x-1">
          <MaterialCommunityIcons name="map-marker" size={16} />
          <Text className="text-md font-bold text-gray-700">
            {/* @ts-ignore */}
            {venue?.value?.description.split(",")[0]}
          </Text>
        </View>
      </View>
      {/* Freebies */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {freebies?.length
          ? freebies.map((free, index) => {
              return (
                <Text
                  className="bg-primary px-3 py-1 rounded-md mt-2 mr-3 font-bold text-white"
                  key={`free_${index}`}
                >
                  {free}
                </Text>
              );
            })
          : null}
      </ScrollView>
      <Text className="text-xs mt-3 text-gray-600">
        {updatedAt
          ? `Edited : ${timeAgo(updatedAt)}`
          : `Posted on : ${timeAgo(createdAt)}`}
      </Text>
      {status !== REQUEST_STATUS.ACCEPTED ? (
        <Button
          className="py-3 mt-2 bg-transparent border-[1px] border-primary"
          onPress={() => {
            handleClick?.(bid);
          }}
        >
          <Text className="text-center text-primary">Accept Bid</Text>
        </Button>
      ) : null}
    </View>
  );
};
