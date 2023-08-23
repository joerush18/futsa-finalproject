import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, useWindowDimensions, Text, ScrollView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import color from "../assets/colors";
import IconButton from "../components/ui/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useRequests from "../hooks/useRequests";
import Loading from "../components/ui/Loading";

const Active = () => {
  const { requests, isfetchingRequests } = useRequests();

  return !requests && isfetchingRequests ? (
    <Loading />
  ) : (
    <ScrollView style={{ flex: 1 }}>
      {requests &&
        requests.map((request) => {
          const { title, description } = request;
          return (
            <View className="px-2 py-3 border-b-[1px] border-gray-300">
              <View className="mx-4">
                <Text className="font-bold text-lg">{title}</Text>
                <Text>{description}</Text>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

const Completed = () => <View style={{ flex: 1 }}></View>;

const renderScene = SceneMap({
  first: Active,
  second: Completed,
});
const RequestsScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active" },
    { key: "second", title: "Completed" },
  ]);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Requests",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
        color: color.white,
      },
    });
  }, []);

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: color.primary }}
            indicatorStyle={{ backgroundColor: color.white, height: 2 }}
            labelStyle={{ color: color.white, fontWeight: "bold" }}
          />
        )}
      />

      <IconButton
        className="absolute bottom-8 right-8 z-10 bg-primary rounded-full h-16 w-16 flex items-center justify-center shadow-md"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("Create-Request");
        }}
      >
        <MaterialCommunityIcons name="plus" size={24} color={color.white} />
      </IconButton>
    </>
  );
};
export default RequestsScreen;
