import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../StackNavigator";

import { ITeam, useEventStore } from "core";
import color from "../assets/colors";
import IconButton from "../components/ui/IconButton";

type EventsDetailScreenRouteProps = RouteProp<
  RootStackParamList,
  "Event-Detail"
>;

interface EventsDetailsScreenProps {
  route: EventsDetailScreenRouteProps;
}

const teams: ITeam[] = [
  {
    id: "",
    name: "Team 1",
    verified: true,
    ownerId: "2",
    createdBy: {
      name: "Player 2",
      email: "sds",
      id: "sdsdj",
    },
    members: [
      {
        name: "Player 1",
        age: 20,
        gender: "male",
        jerseyNumber: 1,
        id: "1",
        phoneNumber: "9841234567",
        position: "Goalkeeper",
        isCaptain: true,
        teamId: "1",
      },
      {
        name: "Player 2",
        age: 22,
        gender: "male",
        jerseyNumber: 7,
        id: "1",
        phoneNumber: "9841234567",
        position: "Forward",
        isCaptain: true,
        teamId: "62",
      },
    ],
  },
  {
    id: "",
    name: "Team 2",
    verified: false,
    ownerId: "2",
    createdBy: {
      name: "Player 2",
      email: "sds",
      id: "sdsdj",
    },
    members: [
      {
        name: "Player 1",
        age: 20,
        gender: "male",
        jerseyNumber: 1,
        id: "1",
        phoneNumber: "9841234567",
        position: "Goalkeeper",
        isCaptain: true,
        teamId: "1",
      },
      {
        name: "Player 2",
        age: 22,
        gender: "male",
        jerseyNumber: 7,
        id: "1",
        phoneNumber: "9841234567",
        position: "Forward",
        isCaptain: true,
        teamId: "62",
      },
    ],
  },
];

const EventDetailsScreen = ({ route }: EventsDetailsScreenProps) => {
  const { eventId } = route.params;
  const { events } = useEventStore();
  const event = events.find((event) => event.id === eventId);
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
        {teams.length ? (
          teams.map((team) => (
            <TouchableOpacity className="border-[1px] border-gray-300 rounded-md px-5 font-bold py-2 bg-gray-200 mb-1 mr-2">
              <Text>{team.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No teams registered</Text>
        )}
      </ScrollView>
      <IconButton className="mt-1 bg-primary w-48">
        <Text className="text-white text-center font-bold">
          Register your team
        </Text>
      </IconButton>
    </ScrollView>
  );
};
export default EventDetailsScreen;

const TextLabel = ({ label, value }: { label: string; value: string }) => {
  return (
    <View className="border-[1px] border-gray-300 rounded-md px-4 py-1 bg-gray-200 mb-3 mr-2">
      <Text className=" text-sm text-gray-400 capitalize">{label}</Text>
      <Text className=" text-sm text-primary font-bold capitalize">
        {value}
      </Text>
    </View>
  );
};
