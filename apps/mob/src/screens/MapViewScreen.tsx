import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { createRatingStars, useCurrentLocation, useFutsalsStore } from "core";
import { Feather } from "@expo/vector-icons";

const Logo = require("../assets/images/futsal.png");

const MapViewScreen = () => {
  const [initialRegion, setInitialRegion] = useState<any>();
  const [refreshed, setRefreshed] = useState(false);
  const { geoLocation } = useCurrentLocation();

  const handleRefresh = () => {
    // Toggle the refreshed state to trigger a re-render
    setRefreshed(!refreshed);
    initialLocationSetup();
  };

  const initialLocationSetup = async () => {
    // Get the current location
    setInitialRegion({
      latitude: geoLocation.lat ?? 28.208218948316958,
      longitude: geoLocation.lng ?? 84.00158931591984,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  useEffect(() => {
    initialLocationSetup();
  }, [geoLocation]);

  return (
    <SafeAreaView>
      <IconButton
        className="absolute top-10 right-8 z-10 bg-primary rounded-full h-16 w-16 flex items-center justify-center shadow-md"
        onPress={handleRefresh}
      >
        <Feather name="refresh-ccw" size={24} color={color.white} />
      </IconButton>
      <View className="h-screen w-full relative">
        {/* <View className="absolute top-0 z-10 px-2 mt-4 w-full">
          <SearchInput setSearchText={setSearchText} />
        </View> */}
        <MapView
          className="h-screen w-full"
          initialRegion={initialRegion}
          key={refreshed ? "refreshed" : "not-refreshed"}
          mapType="mutedStandard"
        >
          {geoLocation && (
            <Marker
              coordinate={{
                latitude: geoLocation.lat ?? 28.208218948316958,
                longitude: geoLocation.lng ?? 84.00158931591984,
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

import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";

const PinLocations = () => {
  const { futsals } = useFutsalsStore();
  if (!futsals) return null;
  const navigator = useNavigation();
  return (
    <>
      {futsals.length > 0 &&
        futsals.map((futsal, index) => {
          if (futsal.geoLocation?.lat && futsal.geoLocation?.lng) {
            return (
              <Marker
                key={`futsal_${index}`}
                coordinate={{
                  latitude: +futsal?.geoLocation?.lat,
                  longitude: +futsal?.geoLocation?.lng,
                }}
                title={futsal.futsalName}
                description={createRatingStars(futsal.ratings)}
              >
                <View className="w-40 flex-row justify-center">
                  <Image source={Logo} className="h-12 w-12  " />
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
