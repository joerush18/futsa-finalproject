import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../StackNavigator";
import Modal from "react-native-modal";

import {
  IEvents,
  ITeam,
  useEventStore,
  useGetMembersByTeam,
  useUpdateEvent,
} from "core";
import color from "../assets/colors";
import IconButton from "../components/ui/IconButton";
import Card from "../components/ui/Card";
import useTeam from "../hooks/useTeam";
import Loading from "../components/ui/Loading";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { set } from "date-fns";
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
            event.teams.map((team) => (
              <TouchableOpacity
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

const RegisterTeamModal = ({
  isVisible,
  setIsVisible,
  event,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  event: IEvents;
}) => {
  const { teams, isFetchingTeams } = useTeam();

  const navigation = useNavigation();

  const { mutate: updateEvent, isLoading: isUpdatingEvent } = useUpdateEvent();
  const { updateEvent: updateLocEvent } = useEventStore();

  const alreadyRegistered = event.teams.find((t) => t.id === teams[0]?.id);

  const handleTeamRegistration = (myTeam: ITeam, prevTeams: ITeam[]) => {
    updateEvent(
      {
        id: event.id,
        teams: [...prevTeams, myTeam],
      },
      {
        onSuccess() {
          Toast.show({
            type: "success",
            text1: "Team registered succesfully.",
          });
          updateLocEvent({
            id: event.id,
            teams: [...prevTeams, myTeam],
          });
          setIsVisible(false);
        },
        onError() {
          Toast.show({
            type: "error",
            text1: "Team registraion failed.",
          });
        },
      }
    );
  };

  if (isFetchingTeams) return <Loading />;
  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Card>
          <Text className="font-bold text-lg">Add team to event</Text>
          <Text className="text-sm opacity-70">
            {!teams.length
              ? "Looks like you don't have a team. Create one now"
              : "You teams look nice. Click to view"}
          </Text>
          {teams.length ? (
            teams.map((team, index) => (
              <View>
                <TouchableOpacity
                  key={`${index}_team`}
                  className="border-[1px] border-gray-300 rounded-md px-5 font-bold py-2 bg-gray-200 m-2  flex-row items-center w-[50%]"
                  // @ts-ignore
                  onPress={() => {
                    setIsVisible(false);
                    // @ts-ignore
                    navigation.navigate("My-Teams");
                  }}
                >
                  <MaterialCommunityIcons
                    name="soccer"
                    size={24}
                    color="black"
                  />
                  <Text className="text-md p-2">{team.name}</Text>
                </TouchableOpacity>
                {alreadyRegistered ? (
                  <View className="flex-row items-center space-x-2 mx-2">
                    <AntDesign name="checkcircle" size={24} color="green" />
                    <Text>Already Registered</Text>
                  </View>
                ) : (
                  <IconButton
                    onPress={() =>
                      handleTeamRegistration(team, event.teams ?? [])
                    }
                    className="bg-primary m-4"
                  >
                    <Text className="text-md text-white text-center font-bold ">
                      {isUpdatingEvent
                        ? "Confirming Registration"
                        : "Confirm Registration"}
                    </Text>
                  </IconButton>
                )}
              </View>
            ))
          ) : (
            <IconButton
              onPress={() => {
                setIsVisible(false);
                // @ts-ignore
                navigation.navigate("My-Teams");
              }}
              className="bg-rose-500 m-4"
            >
              <Text className="text-md  text-center font-bold text-white ">
                Create your team
              </Text>
            </IconButton>
          )}
        </Card>
      </Modal>
    </View>
  );
};

const ViewTeamDetailsModal = ({
  teamId,
  isVisible,
  setIsVisible,
}: {
  teamId: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isLoading: isFetchingMembers } = useGetMembersByTeam(teamId);
  if (isFetchingMembers) {
    return <Loading />;
  }
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
    >
      <Card>
        {data?.length ? (
          data.map((player, index) => (
            <View
              className="mt-2 border-[1px] border-gray-300 rounded-md px-4 py-2 bg-gray-200 flex-row items-end justify-between"
              key={`player_${index}`}
            >
              <View className="flex-col ">
                <View className="flex-row space-x-2 items-end ">
                  <Text className="text-md font-bold capitalize">
                    {player.memberName}
                  </Text>
                  {player.gender.toUpperCase() === "MALE" ? (
                    <Ionicons name="male" size={16} color="black" />
                  ) : (
                    <Ionicons name="female" size={16} color="black" />
                  )}
                  <Text>{player.jerseyNumber}</Text>
                  <Text>{player.position}</Text>
                </View>
                <Text>{player.age} yrs old</Text>
                <View className="flex-row mt-1 items-center space-x-1">
                  <MaterialCommunityIcons
                    name="cellphone-check"
                    size={18}
                    color="black"
                  />
                  <Text>{player.phoneNumber}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No Players</Text>
        )}
      </Card>
    </Modal>
  );
};
