import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Card from "./ui/Card";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import color from "../assets/colors";
import { NOTIFICATION_TYPE } from "core";
import { useNavigation } from "@react-navigation/native";

interface NotificationCardProps {
  type: NOTIFICATION_TYPE;
  message?: string;
  bookedForTime: string;
  createdAtTime: string;
  createdByName: string;
  bookingId?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  message,
  bookedForTime,
  createdAtTime,
  createdByName,
  bookingId,
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate("Booking-Detail", {
          bookingId: bookingId,
        });
      }}
    >
      <Card>
        <View style={styles.flex}>
          {type === NOTIFICATION_TYPE.BOOKING_CONFIRMED && (
            <AntDesign name="checkcircle" size={36} color={color.primary} />
          )}
          {type === NOTIFICATION_TYPE.BOOKING_REJECTED && (
            <Entypo name="circle-with-cross" size={36} color={color.red} />
          )}
          <View style={styles.VFlex}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {createdByName}
              <Text className="font-normal"> {message}</Text>
            </Text>
            <Text>{bookedForTime}</Text>
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
