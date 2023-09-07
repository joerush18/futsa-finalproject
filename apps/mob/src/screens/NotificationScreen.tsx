import { ScrollView, View } from "react-native";
import React, { useLayoutEffect } from "react";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import NotificationCard from "../components/NotificationCard";
import useNotifications from "../hooks/useNotification";
import { timeAgo } from "core";
import Empty from "../components/ui/Empty";
const NotificationScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Notifications",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);

  const { notifications } = useNotifications();

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="px-4">
      {notifications.length === 0 ? (
        <View className="mx-auto">
          <Empty />
        </View>
      ) : (
        notifications.map((notification) => {
          return (
            <NotificationCard
              key={`notification_${notification.id}`}
              type={notification.type}
              message={notification.description}
              createdAtTime={timeAgo(notification.createdAt)}
              createdByName={notification.createdBy?.name ?? ""}
              collectionId={notification.collectionId}
              notificationId={notification.id}
            />
          );
        })
      )}
    </ScrollView>
  );
};

export default NotificationScreen;
