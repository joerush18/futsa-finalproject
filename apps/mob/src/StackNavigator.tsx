import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./screens/SearchScreen";
import OnboardingScreen from "./screens/auth/OnboardingScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import HomeBottomTabs from "./tabs/HomeBottomTabs";
import FutsalDetailScreen from "./screens/FutsalDetailScreen";
import NotificationScreen from "./screens/NotificationScreen";
import FilterScreen from "./screens/FilterScreen";
import BookScreen from "./screens/bookings/BookScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import OtpScreen from "./screens/auth/OtpScreen";
import SetPasswordScreen from "./screens/auth/SetPasswordScreen";
import useCurrentUser from "./hooks/useCurrentUser";
import Toast from "react-native-toast-message";
import BookDetailsScreen from "./screens/bookings/BookDetailsScreen";
import MyBookingsScreen from "./screens/profile/MyBookingsScreen";
import EventDetailsScreen from "./screens/events/EventDetailsScreen";
import MyTeamsScreen from "./screens/profile/MyTeamsScreen";
import RequestsScreen from "./screens/request/RequestsScreen";
import CreateRequestScreen from "./screens/request/CreateRequestScreen";
import RequestDetailsScreen from "./screens/request/RequestDetailsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import { IInitiatiatePayment } from "core";

export type RootStackParamList = {
  "Futsal-Detail": { futsalId: string };
  Main: {};
  Search: {};
  Notification: {};
  Filter: {};
  Booking: {
    futsalId: string;
  };
  "Booking-Detail": { bookingId: string };
  "My-Bookings": {};
  "Event-Detail": { eventId: string };
  "My-Teams": {};
  Requests: {};
  "Create-Request": {};
  "Request-Detail": { requestId: string };
  Payment: {
    paymentData: IInitiatiatePayment;
  };
};

const AfterAuthNavigationContainers = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HomeBottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="Futsal-Detail"
          component={FutsalDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Booking"
          component={BookScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="My-Bookings"
          component={MyBookingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Booking-Detail"
          component={BookDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Event-Detail"
          component={EventDetailsScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Request-Detail"
          component={RequestDetailsScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="My-Teams"
          component={MyTeamsScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Requests"
          component={RequestsScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Create-Request"
          component={CreateRequestScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

const BeforeAuthNavigationContainers = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTP"
          component={OtpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="password"
          component={SetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <Toast position="top" />
    </NavigationContainer>
  );
};

const StackNavigator = () => {
  const { isAuth } = useCurrentUser();
  // useNotifications();

  if (isAuth) {
    return <AfterAuthNavigationContainers />;
  }
  return <BeforeAuthNavigationContainers />;
};

export default StackNavigator;
