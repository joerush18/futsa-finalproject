import { Text, View, ScrollView, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import IconButton from "../../components/ui/IconButton";
import useTeam from "../../hooks/useTeam";
import Loading from "../../components/ui/Loading";
import { ITeam, createUniqueId } from "core";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import CreateTeamForm from "./CreateTeamForm";
import Empty from "../../components/ui/Empty";

const MyTeamsScreen = () => {
  const navigation = useNavigation();
  const {
    isFetchingTeams,
    createTeam,
    isCreatingTeam,
    teams,
    setTeams,
    userId,
  } = useTeam();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My team",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
        color: color.white,
      },
    });
  }, []);

  const [teamName, setTeamName] = React.useState("");

  if (isFetchingTeams) return <Loading />;

  return (
    <View>
      {teams?.length ? (
        teams.map((team) => (
          <ScrollView key={team.id} className="h-screen">
            <CreateTeamForm team={team} />
          </ScrollView>
        ))
      ) : (
        <View className="flex-col  items-center m-auto">
          <Empty />
          <Text className="mt-4 text-gray-500 mx-10 text-center">
            Looks like you don't have a team. Create one by Clicking below.
          </Text>
          <TextInput
            className={`px-4 py-2 border-[1px]  border-gray-300 rounded-md text-grayText text-sm mt-3 w-full`}
            placeholder={"Enter the name of your team."}
            onChange={(e) => {
              setTeamName(e.nativeEvent.text);
            }}
          />
          <IconButton
            className="mt-4"
            onPress={() => {
              if (teamName.length < 8) {
                Toast.show({
                  type: "error",
                  text1: "Can't create team name",
                  text2: "Team name should have at least 8 characters.",
                });
                return;
              }
              const team: ITeam = {
                name: teamName,
                id: createUniqueId(),
                verified: false,
                ownerId: userId,
              };
              createTeam(team, {
                onSuccess: (_, data) => {
                  Toast.show({
                    type: "success",
                    text1: "Team created",
                    text2: "Your team has been created successfully",
                  });
                  setTeams([data]);
                },
              });
            }}
          >
            <Text className="text-primary text-center font-bold">
              {isCreatingTeam ? "Creating" : "Create your team"}
            </Text>
          </IconButton>
        </View>
      )}
    </View>
  );
};

export default MyTeamsScreen;
