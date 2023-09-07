import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IEvents, formatBookingDate, timeAgo } from "core";
import Avatar from "../../components/ui/Avatar";

export const EventCard = ({ event }: { event: IEvents }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate("Event-Detail", {
          eventId: event.id?.toString() ?? "",
        });
      }}
    >
      <View className=" bg-white py-1  mb-2">
        <Text
          className={`${
            event.hasExpired ? "bg-red" : "bg-primary"
          } px-2 py-1 rounded-md  text-white font-bold w-16 text-center absolute right-2 top-2`}
        >
          {event.hasExpired ? "Expired" : "Active"}
        </Text>
        <View className="flex-row items-center mx-2 mt-2">
          <Avatar size={48} label={event?.createdBy?.name} />
          <View className="ml-2">
            <Text className="text-sm font-bold">{event?.createdBy?.name}</Text>
            <Text className="text-xs">{timeAgo(event?.createdAt)}</Text>
          </View>
        </View>
        <View className="mt-1 mx-4 mb-1">
          <Text className="text-lg font-bold ">{event?.name}</Text>
          <Text className="text-xs my-2 text-justify">
            {event?.description.slice(0, 150)}
            {event?.description.length > 150 ? (
              <Text className="text-xs font-bold">... Read more</Text>
            ) : null}
          </Text>
          <Text className="text-md bg-gray-300 px-2 py-1 rounded-md w-64 mb-2">
            {formatBookingDate(event?.eventDate).split(",")[0]} to{" "}
            {formatBookingDate(event?.endDate).split(",")[0]}
          </Text>
        </View>
        <Image
          source={{
            uri: event.eventImage,
          }}
          className="w-full h-48 object-contain "
        />
      </View>
    </TouchableOpacity>
  );
};
