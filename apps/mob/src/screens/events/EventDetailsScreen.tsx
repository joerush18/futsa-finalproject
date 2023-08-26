import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../StackNavigator";

import { useEventStore } from "core";
import color from "../../assets/colors";
import IconButton from "../../components/ui/IconButton";
import { set } from "date-fns";
import TextLabel from "../../components/ui/TextLabel";
import { ViewTeamDetailsModal } from "./ViewTeamDetailsModal";
import { RegisterTeamModal } from "./RegisterTeamModal";
type EventsDetailScreenRouteProps = RouteProp<
  RootStackParamList,
  "Event-Detail"
>;

interface EventsDetailsScreenProps {
  route: EventsDetailScreenRouteProps;
}

const EventDetailsScreen = ({ route }: EventsDetailsScreenProps) => {
  const { eventId } = route.params;
  const { events } = useEventStore();
  const event = events.find((event) => event.id === eventId);
  const [isRegisterModal, setRegisterModal] = useState(false);
  const [isTeamModal, setIsTeamModal] = useState(false);
  const [teamId, setTeamId] = useState<string>("");
  //   @ts-ignore
  const venue = event?.geoLocation?.value?.description.split(",")[1] ?? "";
  if (!event) return null;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Event details",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
        color: color.white,
      },
    });
  }, []);
  return (
    <>
      <ScrollView className="m-3">
        <Image
          source={{
            uri: event.eventImage,
          }}
          className="w-full h-48 object-contain rounded-md mb-2 "
        />
        <View>
          <Text className="text-left font-bold text-lg">{event?.name}</Text>
          <Text className="text-left font-bold opacity-50">
            {event?.createdBy?.name}
          </Text>
          <Text className="text-left font-md text-sm">{venue.trim()}</Text>
        </View>
        <View className="flex-row items-center flex-wrap mt-2">
          <TextLabel label="Entry fee" value={`Rs. ${event.entryFee}`} />
          <TextLabel label="Type" value={`${event.tournamentType}`} />
          <TextLabel label="Ground" value={`${event.numberOfPlayers} A side`} />
          <TextLabel label="Game time" value={`${event.gameTime} min`} />
          <TextLabel label="Event Date" value={`${event.eventDate}`} />
          <TextLabel label="End Date" value={`${event.endDate}`} />
        </View>
        <Text className="font-bold text-md">Description</Text>
        <ScrollView className="max-h-[128px] mt-2" showsVerticalScrollIndicator>
          <Text className="text-sm opacity-70 text-left">
            {event.description.trim()}
          </Text>
        </ScrollView>
        <Text className="font-bold text-md mt-2">Prizes</Text>
        <ScrollView className="max-h-[128px] mt-2" showsVerticalScrollIndicator>
          <Text></Text>
        </ScrollView>
        <Text className="font-bold text-md mt-2">Teams</Text>
        <ScrollView horizontal className="max-h-[128px] mt-2">
          {event && event.teams && event.teams.length ? (
            event.teams.map((team, index) => (
              <TouchableOpacity
                key={`${index}_team`}
                className="border-[1px] border-gray-300 rounded-md px-5 font-bold py-2 bg-gray-200 mb-1 mr-2"
                onPress={() => {
                  setTeamId(team.id);
                  console.log(team.id);
                  setIsTeamModal(true);
                }}
              >
                <Text>{team.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No teams registered</Text>
          )}
        </ScrollView>
        <IconButton
          className="mt-1 bg-primary w-48"
          onPress={() => setRegisterModal(true)}
        >
          <Text className="text-white text-center font-bold">
            Register your team
          </Text>
        </IconButton>
      </ScrollView>
      <RegisterTeamModal
        isVisible={isRegisterModal}
        setIsVisible={setRegisterModal}
        event={event}
      />
      <ViewTeamDetailsModal
        isVisible={isTeamModal}
        setIsVisible={setIsTeamModal}
        teamId={teamId}
      />
    </>
  );
};
export default EventDetailsScreen;
