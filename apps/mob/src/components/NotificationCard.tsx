import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Card from "./ui/Card";
import color from "../assets/colors";
import { NOTIFICATION_TYPE, useUpdateNotification } from "core";
import { useNavigation } from "@react-navigation/native";

interface NotificationCardProps {
  type: NOTIFICATION_TYPE;
  message?: string;
  collectionId: string;
  createdAtTime: string;
  createdByName: string;
  notificationId: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  message,
  collectionId,
  createdAtTime,
  createdByName,
  notificationId,
}) => {
  const navigation = useNavigation();

  const { mutate: updateNotification } = useUpdateNotification();
  return (
    <Pressable
      onPress={() => {
        updateNotification({
          id: notificationId,
          viewed: true,
        });
        if (type === NOTIFICATION_TYPE.BOOKING && collectionId) {
          // @ts-ignore
          navigation.navigate("My-Bookings");
        }
        if (type === NOTIFICATION_TYPE.BOOKING && collectionId) {
          // @ts-ignore
          // navigation.navigate("My-Payments");
        }
      }}
    >
      <Card>
        <View style={styles.flex}>
          {/* {type === NOTIFICATION_TYPE.BOOKING && (
            <AntDesign name="checkcircle" size={36} color={color.primary} />
          )} */}

          <View style={styles.VFlex}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {createdByName}
            </Text>
            <Text className="font-normal">{message}</Text>
            <Text
              style={{
                color: color.grayLight,
              }}
            >
              {createdAtTime}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  flex: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  VFlex: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  timeText: {
    color: color.grayText,
    opacity: 0.5,
  },
});
