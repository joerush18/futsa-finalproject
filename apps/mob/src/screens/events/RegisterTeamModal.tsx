import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import {
  IEvents,
  ITeam,
  useEventStore,
  useMemberStore,
  useUpdateEvent,
} from "core";
import IconButton from "../../components/ui/IconButton";
import Card from "../../components/ui/Card";
import useTeam from "../../hooks/useTeam";
import Loading from "../../components/ui/Loading";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useEvents from "../../hooks/useEvents";
import useMembers from "../../hooks/useMembers";

export const RegisterTeamModal = ({
  isVisible,
  setIsVisible,
  event,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  event: IEvents;
}) => {
  const { teams, isFetchingTeams } = useTeam();
  const { myEvents } = useEvents();
  const { members } = useMembers(teams ? teams[0].id : "");

  const navigation = useNavigation();

  const { mutate: updateEvent, isLoading: isUpdatingEvent } = useUpdateEvent();
  const { updateEvent: updateLocEvent } = useEventStore();

  const isInAnotherEvents =
    myEvents?.length && myEvents.some((e) => e.hasExpired === false);

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
          <Text className="font-bold text-lg mx-2">Add team to event</Text>
          <Text className="text-sm opacity-70 mx-2">
            {!teams.length
              ? "Looks like you don't have a team. Create one now"
              : "You teams look nice. Click to view"}
          </Text>
          {teams.length ? (
            teams.map((team, index) => (
              <View key={`${index}_team`}>
                <TouchableOpacity
                  className="border-[1px] border-gray-300 rounded-md px-5 font-bold py-2 bg-gray-200 m-2  flex-row items-center"
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
                  <Text className="text-md p-2 ">{team.name}</Text>
                  <Text className="mx-1 font-bold">
                    ({members && members.length} / {event.numberOfPlayers}{" "}
                    members)
                  </Text>
                </TouchableOpacity>
                {isInAnotherEvents ? (
                  <Text className="mx-2 text-orange-600">
                    You are already registered in another event. You can only be
                    in one event at a time.
                  </Text>
                ) : (
                  <>
                    {members?.length &&
                    members?.length >= +event.numberOfPlayers ? (
                      <IconButton
                        onPress={() =>
                          handleTeamRegistration(team, event.teams ?? [])
                        }
                        className="bg-primary mx-2"
                      >
                        <Text className="text-md text-white text-center font-bold ">
                          {isUpdatingEvent
                            ? "Confirming Registration"
                            : "Confirm Registration"}
                        </Text>
                      </IconButton>
                    ) : (
                      <>
                        <Text className="mx-4 text-xs text-orange-500">
                          You need to add more player to be able to register to
                          the event.
                        </Text>
                        <IconButton
                          onPress={() => {
                            setIsVisible(false);
                            navigation.navigate("My-Teams" as never);
                          }}
                          className="bg-primary mt-3 mx-1"
                        >
                          <Text className="text-md text-white text-center font-bold ">
                            Add more players
                          </Text>
                        </IconButton>
                      </>
                    )}
                  </>
                )}
              </View>
            ))
          ) : (
            <IconButton
              onPress={() => {
                setIsVisible(false);
                navigation.navigate("My-Teams" as never);
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
