import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl,
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
        ? events?.map((event, index) => {
            return <EventCard event={event} key={`${index}_event`} />;
          })
        : null}
    </ScrollView>
  );
};
