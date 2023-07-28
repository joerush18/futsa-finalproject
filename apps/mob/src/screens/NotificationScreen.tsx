import { ScrollView, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import Sectionlayout from "../components/layout/Sectionlayout";
import NotificationCard from "../components/NotificationCard";
import useNotifications from "../hooks/useNotification";
import { formatBookingDate, timeAgo } from "core";
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
      <ScrollView>
        {notifications.length === 0 ? (
          <Text className="font-bold m-4">No notifications</Text>
        ) : (
          notifications.map((notification) => {
            const message = `has ${
              notification.type.split(" ")[0]
            } your booking for`;
            return (
              <NotificationCard
                key={`notification_${notification.id}`}
                type={notification.type}
                message={message}
                bookedForTime={formatBookingDate(
                  notification?.bookedForTime ?? ""
                )}
                createdAtTime={timeAgo(notification.createdAt)}
                createdByName={notification.createdBy?.name ?? ""}
                bookingId={notification.bookingId}
              />
            );
          })
        )}
      </ScrollView>
    </Sectionlayout>
  );
};

export default NotificationScreen;
