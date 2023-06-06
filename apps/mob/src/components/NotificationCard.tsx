import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./ui/Card";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import color from "../assets/colors";

enum NOTIFICATION_TYPE_ENUM {
  ACCEPT = "accept",
  REJECT = "reject",
}

interface NotificationCardProps {
  type: "accept" | "reject";
  message?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  message,
}) => {
  return (
    <Card>
      <View style={styles.flex}>
        {type === NOTIFICATION_TYPE_ENUM.ACCEPT && (
          <AntDesign name="checkcircle" size={36} color={color.primary} />
        )}
        {type === NOTIFICATION_TYPE_ENUM.REJECT && (
          <Entypo name="circle-with-cross" size={36} color={color.red} />
        )}
        <View style={styles.VFlex}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Hardik Futsal{" "}
            <Text style={{ fontWeight: "200", color: color.grayText }}>
              has {type}ed your booking request.
            </Text>
          </Text>
          <Text>{message}</Text>
          <Text
            style={{
              color: color.grayLight,
            }}
          >
            2 hrs ago.
          </Text>
        </View>
      </View>
    </Card>
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
