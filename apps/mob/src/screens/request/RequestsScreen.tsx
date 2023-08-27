import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useWindowDimensions, ScrollView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import color from "../../assets/colors";
import IconButton from "../../components/ui/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useRequests from "../../hooks/useRequests";
import Loading from "../../components/ui/Loading";
import Empty from "../../components/ui/Empty";
import { RequestCard } from "./RequestCard";
import { ref } from "firebase/storage";

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
  const {
    completedRequests: requests,
    isfetchingRequests,
    refetch,
  } = useRequests();

  React.useEffect(() => {
    refetch();
  }, []);

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
      title: "My Requests",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerLeft: () => {
        return (
          <MaterialCommunityIcons
            name="soccer"
            size={24}
            color={color.white}
            style={{ marginLeft: 12 }}
          />
        );
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
            indicatorStyle={{ backgroundColor: "white", height: 2 }}
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