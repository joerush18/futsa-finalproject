import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StackNavigator from "./StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { loadAsync } from "expo-font";
import * as Font from "expo-font";
import { useEffect } from "react";

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

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
      </QueryClientProvider>
    </>
  );
}
