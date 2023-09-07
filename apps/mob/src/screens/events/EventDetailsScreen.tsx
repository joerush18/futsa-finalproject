import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../StackNavigator";

import { IEvents, useEventStore, useUpdateEvent } from "core";
import color from "../../assets/colors";
import IconButton from "../../components/ui/IconButton";
import TextLabel from "../../components/ui/TextLabel";
import { RegisterTeamModal } from "./RegisterTeamModal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import useCurrentUser from "../../hooks/useCurrentUser";
import { AntDesign } from "@expo/vector-icons";
import { LeaveEventModal } from "./LeaveEventModal";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import useEvents from "../../hooks/useEvents";
import useRefetch from "../../hooks/useRefetch";

type EventsDetailScreenRouteProps = RouteProp<
  RootStackParamList,
  "Event-Detail"
>;

interface EventsDetailsScreenProps {
  route: EventsDetailScreenRouteProps;
}

const EventDetailsScreen = ({ route }: EventsDetailsScreenProps) => {
  const { refetch } = useEvents();
  const { refreshing, onRefresh } = useRefetch(refetch);
  const { eventId } = route.params;
  const { events, updateEvent: updateEventLocal } = useEventStore();
  const event = events && events.find((event) => event.id === eventId);
  const [isRegisterModal, setRegisterModal] = useState(false);
  const { user } = useCurrentUser();

  const [leaveModal, setLeaveModal] = useState(false);
  const { mutate: updateEvent, isLoading: isUpdatingEvent } = useUpdateEvent();

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

  const myTeam = event.teams.filter((t) => t.ownerId === user?.id);
  const alreadyRegistered = myTeam.length;

  const leaveEventHandler = (event: IEvents) => {
    const team = event.teams.find((t) => t.ownerId === user?.id);
    if (!team) return;
    const updatedTeams = event.teams.filter((t) => t.id !== team.id);
    const updatedEvent = { ...event, teams: updatedTeams };
    updateEvent(updatedEvent, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "You have left the event.",
        });
        updateEventLocal(updatedEvent);
      },
    });
  };

  return (
    <>
      <ScrollView
        className="m-3"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image
          source={{
            uri: event.eventImage,
          }}
          className="w-full h-48 object-contain rounded-md mb-2 "
        />
        <Text
          className={`${
            event.hasExpired ? "bg-red" : "bg-primary"
          } px-2 py-1 rounded-md  text-white font-bold w-16 text-center absolute right-0`}
        >
          {event.hasExpired ? "Expired" : "Active"}
        </Text>

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
        <Text className="font-bold text-md mt-2">Description</Text>

        <Text className="text-sm opacity-70 text-justify my-2">
          {event.description.trim()}
        </Text>
        <Text className="font-bold text-md mt-2">Prizes</Text>
        <Text className="font-bold text-md mt-2">
          Registered Teams ({event.teams.length})
        </Text>
        <ScrollView
          horizontal
          className="max-h-[128px] mt-2"
          showsHorizontalScrollIndicator={false}
        >
          {event && event.teams && event.teams.length ? (
            event.teams.map((team, index) => {
              const isMyTeam = team.ownerId === user.id;
              return (
                <TouchableOpacity
                  key={`${index}_team`}
                  className={`${
                    isMyTeam ? " bg-blue-200" : "bg-gray-200"
                  } border-[1px] border-gray-300 rounded-md px-5 font-bold py-2 mb-1 mr-2 flex-row flex items-center space-x-2`}
                >
                  {team.verified ? (
                    <MaterialIcons name="verified" size={24} color="gray" />
                  ) : (
                    <Octicons name="unverified" size={24} color="gray" />
                  )}
                  <Text className="text-gray-600 font-bold">{team.name}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>No teams registered</Text>
          )}
        </ScrollView>
        {alreadyRegistered ? (
          <>
            <View className="flex-row items-center space-x-2 mx-2 mt-2">
              <AntDesign name="checkcircle" size={24} color="green" />
              <Text>You are registered to the event.</Text>
            </View>
            {!myTeam[0].verified && !event.hasExpired ? (
              <IconButton
                className=" text-center mt-2 flex flex-row items-center space-x-3 justify-left w-40"
                onPress={() => setLeaveModal(true)}
              >
                <MaterialCommunityIcons
                  name="exit-to-app"
                  size={24}
                  color={color.primary}
                />
                <Text className="text-md font-bold text-primary">
                  Leave this event
                </Text>
              </IconButton>
            ) : null}

            {event.teams.length > 1 ? (
              <IconButton className="mt-4 bg-primary">
                <Text className="text-md text-white text-center font-bold tracking-wide">
                  {event.hasExpired ? "View Results" : "View Tiesheet"}
                </Text>
              </IconButton>
            ) : null}
          </>
        ) : (
          <IconButton
            className="mt-1 bg-primary w-48 disabled:bg-gray-300"
            onPress={() => setRegisterModal(true)}
          >
            <Text className="text-white text-center font-bold">
              Register your team
            </Text>
          </IconButton>
        )}
      </ScrollView>
      <RegisterTeamModal
        isVisible={isRegisterModal}
        setIsVisible={setRegisterModal}
        event={event}
      />
      {/* <ViewTeamDetailsModal
        isVisible={isTeamModal}
        setIsVisible={setIsTeamModal}
        teamId={teamId}
      /> */}
      <LeaveEventModal
        isVisible={leaveModal}
        setIsVisible={setLeaveModal}
        handleConfirm={() => {
          leaveEventHandler(event);
        }}
      />
    </>
  );
};
export default EventDetailsScreen;
