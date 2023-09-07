import React from "react";
import { ScrollView, Text, RefreshControl, View } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import useEvents from "../../hooks/useEvents";
import { IEvents } from "core";
import useRefetch from "../../hooks/useRefetch";
import Loading from "../../components/ui/Loading";
import { EventCard } from "./EventCard";
import Empty from "../../components/ui/Empty";
const MyEventsScreen = () => {
  const navigation = useNavigation();
  const { myEvents: events, refetch, isLoading } = useEvents();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Events",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
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

export default MyEventsScreen;

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
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {events?.length ? (
        events?.map((event, index) => {
          return <EventCard event={event} key={`${index}_event`} />;
        })
      ) : (
        <View className="mx-auto">
          <Empty />
        </View>
      )}
    </ScrollView>
  );
};
