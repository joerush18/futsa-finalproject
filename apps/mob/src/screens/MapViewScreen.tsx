import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import SearchInput from "../components/ui/SearchInput";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";

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
        latitude: location.coords.latitude || 28.185073,
        longitude: location.coords.latitude || 83.9722326,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  return (
    <SafeAreaView>
      <View className="h-screen w-full relative">
        <View className="absolute top-0 z-10 px-2 mt-4 w-full">
          <SearchInput />
        </View>
        <MapView className="h-screen w-full" initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            />
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapViewScreen;
