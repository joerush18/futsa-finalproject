import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useGetMembersByTeam } from "core";
import Card from "../../components/ui/Card";
import Loading from "../../components/ui/Loading";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const ViewTeamDetailsModal = ({
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
