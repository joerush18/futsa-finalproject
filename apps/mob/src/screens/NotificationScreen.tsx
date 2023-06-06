import { ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import Sectionlayout from "../components/layout/Sectionlayout";
import NotificationCard from "../components/NotificationCard";
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
  return (
    <ScrollView>
      {Array.from({ length: 4 }).map((item, index) => {
        return (
          <Sectionlayout title="Today" key={index}>
            <ScrollView>
              <NotificationCard type="accept" message="See you there !" />
              <NotificationCard type="reject" message="Sorry !" />
            </ScrollView>
          </Sectionlayout>
        );
      })}
    </ScrollView>
  );
};

export default NotificationScreen;
