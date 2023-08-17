import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Image,
  RefreshControl,
} from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useEvents from "../hooks/useEvents";
import { IEvents, formatBookingDate, timeAgo } from "core";
import Avatar from "../components/ui/Avatar";
import useRefetch from "../hooks/useRefetch";
import Loading from "../components/ui/Loading";
const EventScreen = () => {
  const navigation = useNavigation();
  const { events, refetch, isLoading } = useEvents();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Events",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification" as never)}
          >
            <MaterialCommunityIcons
              name="whistle-outline"
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
        );
      },

      headerLeft: () => {
        return (
          <MaterialCommunityIcons
            name="soccer"
            size={24}
            color="white"
            style={{ marginLeft: 12 }}
          />
        );
      },
    });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <EventCards events={events} refetch={refetch} />
    </>
  );
};

export default EventScreen;

const EventCards = ({
  events,
  refetch,
}: {
  events?: IEvents[];
  refetch: any;
}) => {
  const { refreshing, onRefresh } = useRefetch(refetch);

  if (!events) {
    return <Text>No events</Text>;
  }
  return (
    <ScrollView
      className="bg-gray-300"
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {events?.length
        ? events?.map((event) => {
            return <EventCard event={event} />;
          })
        : null}
    </ScrollView>
  );
};

const EventCard = ({ event }: { event: IEvents }) => {
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
      <View className=" border-b-[1px] border-gray-200 py-1 bg-white mb-2">
        <View className="flex-row items-center mx-2">
          <Avatar size={48} label={event?.createdBy?.name} />
          <View className="ml-2 mt-2">
            <Text className="text-sm font-bold">{event?.createdBy?.name}</Text>
            <Text className="text-xs">{timeAgo(event?.createdAt)}</Text>
          </View>
        </View>
        <View className="mt-1 mx-4 mb-1">
          <Text className="text-lg font-bold ">{event?.name}</Text>
          <Text className="text-md">
            {formatBookingDate(event?.eventDate).split(",")[0]} to{" "}
            {formatBookingDate(event?.endDate).split(",")[0]}
          </Text>
          <Text className="text-xs mt-1">
            {event?.description.slice(0, 150)}
            {event?.description.length > 150 ? (
              <Text className="text-xs font-bold">... Read more</Text>
            ) : null}
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
