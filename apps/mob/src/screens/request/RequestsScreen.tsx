import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useRequests from "../../hooks/useRequests";
import Loading from "../../components/ui/Loading";
import { RequestCard } from "./RequestCard";
import Empty from "../../components/ui/Empty";
import { useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../../components/ui/IconButton";
import useNotifications from "../../hooks/useNotification";

const RequestsScreen = () => {
  const { allRequests, isfetchingRequests, onRefresh, refreshing } =
    useRequests();

  const { unReadNotification } = useNotifications();

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Requests",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerLeft: () => {
        return (
          <MaterialCommunityIcons
            name="post-outline"
            size={24}
            color={color.white}
            style={{ marginLeft: 12 }}
          />
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification" as never)}
          >
            <MaterialCommunityIcons
              name="whistle-outline"
              size={24}
              color="white"
              style={{ marginRight: 28 }}
            />
            {unReadNotification > 0 && (
              <View className="absolute top-0 right-3 bg-red h-5 w-5 flex items-center justify-center  rounded-full">
                <Text className="text-md color-white">
                  {unReadNotification}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      },
    });
  }, []);
  if (isfetchingRequests) return <Loading />;
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {allRequests?.length ? (
          allRequests.map((request, index) => {
            return <RequestCard request={request} key={`request_${index}`} />;
          })
        ) : (
          <View className="flex flex-row items-center justify-center w-full">
            <Empty />
          </View>
        )}
      </ScrollView>
      <IconButton
        className="absolute right-8 bottom-8 z-10 bg-primary rounded-full h-16 w-16 flex items-center justify-center shadow-md"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("Create-Request", {
            requestId: null,
          });
        }}
      >
        <MaterialCommunityIcons name="plus" size={24} color={color.white} />
      </IconButton>
    </>
  );
};

export default RequestsScreen;
