import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import color from "../assets/colors";
import IconButton from "../components/ui/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useRequests from "../hooks/useRequests";
import Loading from "../components/ui/Loading";
import { IRequest, REQUEST_STATUS, timeAgo } from "core";
import Empty from "../components/ui/Empty";

const Active = () => {
  const { activeRequests: requests, isfetchingRequests } = useRequests();

  return isfetchingRequests ? (
    <Loading />
  ) : (
    <ScrollView style={{ flex: 1 }}>
      {requests.length ? (
        requests.map((request, index) => {
          return <RequestCard request={request} key={`request_${index}`} />;
        })
      ) : (
        <Empty />
      )}
    </ScrollView>
  );
};

const Completed = () => {
  const { completedRequests: requests, isfetchingRequests } = useRequests();

  return isfetchingRequests ? (
    <Loading />
  ) : (
    <ScrollView style={{ flex: 1 }}>
      {requests.length ? (
        requests.map((request, index) => {
          return <RequestCard request={request} key={`request_${index}`} />;
        })
      ) : (
        <Empty />
      )}
    </ScrollView>
  );
};

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

const RequestCard = ({ request }: { request: IRequest }) => {
  const { title, description, createdAt, budget, id, status } = request;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate("Request-Detail", { requestId: id });
      }}
    >
      <View className="py-3 border-b-[1px] border-gray-300">
        <View className="mx-3">
          <Text
            className={`font-bold mb-2 px-2 py-1 rounded-lg max-w-[120px] text-center text-white ${
              status === REQUEST_STATUS.ACCEPTED
                ? "bg-green-700"
                : "bg-orange-500"
            }`}
          >
            {status}
          </Text>
          <Text className="font-bold text-md">{title}</Text>
          <Text className="font-bold text-sm text-primary">Rs. {budget}</Text>
          <Text className=" text-gray-600">
            {description.replace(/\s+/g, " ").slice(0, 98)} ...
          </Text>
          <View className="flex-row justify-between items-center mt-3">
            <Text className=" text-gray-400 text-left">
              {timeAgo(createdAt)}
            </Text>
            <Text className=" mt-1 text-left font-bold text-primaryLight">
              {description.length > 100 ? "View more" : ""}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
