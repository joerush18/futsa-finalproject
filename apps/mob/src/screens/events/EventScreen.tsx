import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl,
  View,
} from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useEvents from "../../hooks/useEvents";
import { IEvents } from "core";
import useRefetch from "../../hooks/useRefetch";
import Loading from "../../components/ui/Loading";
import { EventCard } from "./EventCard";
import useNotifications from "../../hooks/useNotification";
const EventScreen = () => {
  const navigation = useNavigation();
  const { unReadNotification } = useNotifications();
  const { otherEvents: events, refetch, isLoading } = useEvents();
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
              style={{ marginRight: 28 }}
            />
            {unReadNotification > 0 && (
              <View className="absolute top-0 right-3 bg-red h-5 w-5 flex items-center justify-center  rounded-full">
                <Text className="text-md color-white">
                  {unReadNotification}
                </Text>
              </View>
            )}
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
        ? events?.map((event, index) => {
            return <EventCard event={event} key={`${index}_event`} />;
          })
        : null}
    </ScrollView>
  );
};
