import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../assets/colors";
import InputComponent from "../../components/ui/InputComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IMember,
  ITeam,
  MemberSchema,
  createUniqueId,
  useCreateMember,
  useDeleteMember,
  useGetMembersByTeam,
  useUpdateMember,
} from "core";
import Modal from "react-native-modal";
import Card from "../../components/ui/Card";
import IconButton from "../../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useMemberStore from "core/src/store/useMemberStore";
import useRefetch from "../../hooks/useRefetch";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Loading from "../../components/ui/Loading";
import useEvents from "../../hooks/useEvents";

const CreateTeamForm = ({ team }: { team: ITeam }) => {
  const { isLoading, refetch } = useGetMembersByTeam(team.id);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const { refreshing, onRefresh } = useRefetch(refetch);

  const [selectedPlayer, setSelectedPlayer] = useState<IMember>();

  const { mutate: createMember, isLoading: isCreatingMember } =
    useCreateMember();

  const { mutate: updateMember, isLoading: isUpdatingMember } =
    useUpdateMember();

  const { mutate: deleteMember, isLoading: isDeletingMember } =
    useDeleteMember();

  const { myEvents } = useEvents();
  const isInEvents = myEvents?.some(
    (event) => event.teams[0].id === team.id && !event.hasExpired
  );

  const {
    members,
    setMembers,
    updateMember: updateMemLocal,
  } = useMemberStore();

  const deletePlayer = (id: string) => {
    setMembers(members.filter((player) => player.id !== id));
    deleteMember(id, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Member deleted successfully",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      },
    });
  };

  const handleCreatePlayer = (player: IMember) => {
    createMember(
      {
        ...player,
        id: createUniqueId(),
        teamId: team.id,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Member created successfully",
          });
          setMembers([...members, player]);
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
        },
      }
    );
    setIsVisible(false);
    setEditMode(false);
  };

  const handleUpdatePlayer = (player: IMember) => {
    updateMember(
      {
        ...player,
        id: selectedPlayer?.id ?? "",
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Member updated successfully",
          });
          updateMemLocal({
            ...player,
            id: selectedPlayer?.id ?? "",
          });
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
        },
      }
    );
    setIsVisible(false);
    setEditMode(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isCreatingMember || isUpdatingMember || isDeletingMember) {
    return <Loading />;
  }

  return (
    <ScrollView
      className="mx-4 mt-2"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className="font-bold text-xl">{team?.name}</Text>
      <Text>
        {isInEvents
          ? "This team is in an event. You can't edit it."
          : "You can add members to your team."}
      </Text>
      {!isInEvents ? (
        <View className="mt-4 flex-row items-end justify-between">
          <Text className="text-xl font-bold">Add member</Text>
          <TouchableOpacity
            className="h-10 w-10 bg-gray-500 rounded-md flex-row items-center justify-center"
            onPress={() => setIsVisible(true)}
          >
            <Text className="font-bold text-white text-xl">+</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {isInEvents ? (
        <Text className=" font-bold px-2 py-3 bg-gray-200 my-2 rounded-md">
          Current Event : {myEvents && myEvents[0].name}
        </Text>
      ) : null}

      <View>
        {members?.length > 0 ? (
          members.map((player, index) => (
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
              {!isInEvents ? (
                <View className="flex-row space-x-2 items-center mt-2">
                  <MaterialCommunityIcons
                    name="delete-circle"
                    size={36}
                    color={color.red}
                    onPress={() => deletePlayer(selectedPlayer?.id ?? "")}
                  />
                  <MaterialCommunityIcons
                    name="account-edit"
                    size={36}
                    color={color.blueLight}
                    onPress={() => {
                      setIsVisible(true);
                      setEditMode(true);
                      setSelectedPlayer(player);
                    }}
                  />
                </View>
              ) : null}
            </View>
          ))
        ) : (
          <Text>No Members yet</Text>
        )}
      </View>
      {!isInEvents ? (
        <AddMemberFormModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          editMode={editMode}
          setEditMode={setEditMode}
          handleCreatePlayer={handleCreatePlayer}
          handleUpdatePlayer={handleUpdatePlayer}
          key={`add_member_modal-${editMode}}`}
          selectedPlayer={selectedPlayer}
        />
      ) : null}
    </ScrollView>
  );
};

export default CreateTeamForm;

const AddMemberFormModal = ({
  isVisible,
  setIsVisible,
  editMode,
  setEditMode,
  selectedPlayer,
  handleCreatePlayer,
  handleUpdatePlayer,
}: {
  isVisible: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayer: IMember | undefined;
  handleCreatePlayer: (value: IMember) => void;
  handleUpdatePlayer: (value: IMember) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IMember>({
    resolver: zodResolver(MemberSchema),
    defaultValues: editMode ? selectedPlayer : undefined,
  });

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
          setEditMode(false);
        }}
      >
        <Card>
          <Text className="font-bold text-lg">
            {editMode ? "Update player info" : "Add team member"}
          </Text>
          <Text className="text-sm opacity-70">
            You can {editMode ? "update" : "add"} team members of your team.
          </Text>
          <View>
            <InputComponent
              label="Name"
              control={control}
              name="memberName"
              error={errors.memberName?.message}
            />

            <InputComponent
              label="Gender"
              control={control}
              name="gender"
              error={errors.gender?.message}
            />
            <InputComponent
              label="Age"
              control={control}
              name="age"
              keyboardType="numeric"
              error={errors.age?.message}
            />

            <InputComponent
              label="Position"
              control={control}
              name="position"
              error={errors.position?.message}
            />
          </View>
          <InputComponent
            label="Jersey No"
            control={control}
            name="jerseyNumber"
            keyboardType="numeric"
            error={errors.jerseyNumber?.message}
          />
          <InputComponent
            label="Phone number"
            control={control}
            name="phoneNumber"
            keyboardType="numeric"
            error={errors.phoneNumber?.message}
          />
          <InputComponent
            label="Email"
            control={control}
            name="email"
            error={errors.email?.message}
          />
          <IconButton
            className="bg-primary mt-3"
            onPress={
              editMode
                ? handleSubmit(handleUpdatePlayer)
                : handleSubmit(handleCreatePlayer)
            }
          >
            <Text className="text-white text-center">
              {editMode ? "Update" : "Add"}
            </Text>
          </IconButton>
        </Card>
      </Modal>
    </View>
  );
};
