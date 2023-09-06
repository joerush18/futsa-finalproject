import { ScrollView, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import Sectionlayout from "../components/layout/Sectionlayout";
import NotificationCard from "../components/NotificationCard";
import useNotifications from "../hooks/useNotification";
import { timeAgo } from "core";
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
    <Sectionlayout title="Today">
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <Text className="font-bold m-4">No notifications</Text>
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
    </Sectionlayout>
  );
};

export default NotificationScreen;
