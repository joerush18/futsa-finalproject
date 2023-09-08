import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StackNavigator from "./StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useCurrentLocation } from "core";
import Toast from "react-native-toast-message";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  AsyncStorage.getItem("example_key")
    .then((value) => console.log("AsyncStorage is working:", value))
    .catch((error) => console.error("AsyncStorage is not working:", error));

  const { setGeoLocation } = useCurrentLocation();

  useEffect(() => {
    // Request permission to access location
    Location.requestForegroundPermissionsAsync().then((res) => {
      if (res.status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Location permission not granted",
          text2: "Please enable location permission to use the app",
        });
      }
      Location.getCurrentPositionAsync({}).then((location) => {
        setGeoLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
      </QueryClientProvider>
    </>
  );
}
