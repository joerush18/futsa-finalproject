import { TouchableOpacity, ScrollView, Text, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";
import Sectionlayout from "../components/layout/Sectionlayout";

import FutsalImageCard from "../components/FutsalImageCard";
import FutsalCard from "../components/FutsalCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBox from "../components/ui/SearchBox";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "FUTSA",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
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
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
        );
      },

      headerLeft: () => {
        return (
          <MaterialCommunityIcons
            name="soccer"
            size={24}
            color="white"
            style={{ marginLeft: 12 }}
          />
        );
      },
    });
  }, []);
  return (
    <ScrollView>
      <View
        className="flex-col items-start justify-center p-4"
        style={{
          backgroundColor: color.primary,
        }}
      >
        <Text className="text-white mb-2 text-xl">Explore</Text>
        <SearchBox />
      </View>
      <Sectionlayout title="Nearby futsals" buttonText="View all">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 5 }, () => (
            <FutsalImageCard />
          ))}
        </ScrollView>
      </Sectionlayout>
      <Sectionlayout title="Popular Futsals" buttonText="View all">
        <ScrollView>
          {Array.from({ length: 3 }, () => (
            <FutsalCard />
          ))}
        </ScrollView>
      </Sectionlayout>
    </ScrollView>
  );
};

export default HomeScreen;
