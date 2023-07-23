import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";
import Sectionlayout from "../components/layout/Sectionlayout";

import FutsalImageCard from "../components/FutsalImageCard";
import FutsalCard from "../components/FutsalCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBox from "../components/ui/SearchBox";
import { useGetAllFutsal } from "core/src/db/hooks/useFutsal";
import Loading from "../components/ui/Loading";
import useRefetch from "../hooks/useRefetch";

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

  const { data, isLoading, refetch } = useGetAllFutsal();
  const { onRefresh, refreshing } = useRefetch(refetch);

  if (isLoading) return <Loading />;
  if (!data) return <Text>No data</Text>;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        <ScrollView horizontal={true}>
          {data.length ? (
            data.map((futsal, index) => {
              return <FutsalImageCard key={`futsa_${index}`} futsal={futsal} />;
            })
          ) : (
            <Text>No futsal registered yet.</Text>
          )}
        </ScrollView>
      </Sectionlayout>
      <Sectionlayout title="Popular Futsals" buttonText="View all">
        <ScrollView>
          {data.length ? (
            data.map((futsal, index) => {
              return <FutsalCard key={`futsa_${index}`} futsal={futsal} />;
            })
          ) : (
            <Text>No futsal registered yet.</Text>
          )}
        </ScrollView>
      </Sectionlayout>
    </ScrollView>
  );
};

export default HomeScreen;
