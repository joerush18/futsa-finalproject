import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from "react-native-maps";
import SearchInput from "../components/ui/SearchInput";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { createRatingStars, useFutsalsStore } from "core";
import BookNowButton from "../components/ui/BookNowButton";
import FutsalImageCard from "../components/FutsalImageCard";

const MapViewScreen = () => {
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords>();
  const [initialRegion, setInitialRegion] = useState<any>();

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude || 28.208218948316958,
        longitude: location.coords.longitude || 84.00158931591984,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // const [searchText, setSearchText] = React.useState("");

  return (
    <SafeAreaView>
      <View className="h-screen w-full relative">
        {/* <View className="absolute top-0 z-10 px-2 mt-4 w-full">
          <SearchInput setSearchText={setSearchText} />
        </View> */}
        <MapView className="h-screen w-full" initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
              description="You are here"
            />
          )}
          <PinLocations />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapViewScreen;

import { FontAwesome } from "@expo/vector-icons";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";

const PinLocations = () => {
  const { futsals } = useFutsalsStore();
  if (!futsals) return null;
  const navigator = useNavigation();
  return (
    <>
      {futsals.length > 0 &&
        futsals.map((futsal) => {
          if (futsal.geoLocation?.lat && futsal.geoLocation?.lng) {
            return (
              <Marker
                coordinate={{
                  latitude: +futsal?.geoLocation?.lat,
                  longitude: +futsal?.geoLocation?.lng,
                }}
                title={futsal.futsalName}
                description={createRatingStars(futsal.ratings)}
              >
                <View className="w-40 flex-row justify-center">
                  <FontAwesome
                    name="soccer-ball-o"
                    size={24}
                    color={color.primary}
                  />
                </View>
                <Callout
                  onPress={() => {
                    // @ts-ignore
                    navigator.navigate("Futsal-Detail", {
                      futsalId: futsal.id.toString(),
                    });
                  }}
                >
                  <Text className="font-bold text-gray-700 text-sm">
                    {futsal.futsalName}
                  </Text>
                  <Text className=" text-primary text-xs">
                    Rs. {futsal.price}
                  </Text>
                  <Text className="text-yellow">
                    {createRatingStars(futsal.ratings)}
                  </Text>
                  <Text className="text-xs ">{futsal.phonenumber}</Text>
                </Callout>
              </Marker>
            );
          }
        })}
    </>
  );
};
