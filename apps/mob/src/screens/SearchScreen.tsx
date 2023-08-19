import { View, ScrollView, TextInput } from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import SearchInput from "../components/ui/SearchInput";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";
import { useFutsalsStore } from "core";
import FutsalCard from "../components/FutsalCard";
import Empty from "../components/ui/Empty";

const SearchScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "All futsals",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);
  const { futsals } = useFutsalsStore();

  const [searchText, setSearchText] = React.useState("");

  return (
    <>
      <View
        className="flex-col items-start justify-center p-4"
        style={{
          backgroundColor: color.primary,
        }}
      >
        <SearchInput setSearchText={setSearchText} />
      </View>
      <ScrollView className="p-2">
        {futsals.length ? (
          futsals.map((futsal) => {
            if (
              searchText &&
              searchText.trim() &&
              !futsal.futsalName
                .toUpperCase()
                .includes(searchText.toUpperCase())
            ) {
              return null;
            }
            return <FutsalCard futsal={futsal} key={futsal.id} />;
          })
        ) : (
          <Empty label="No futsals found" />
        )}
      </ScrollView>
    </>
  );
};

export default SearchScreen;
