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
import BookScreen from "./screens/BookScreen";
import SignupScreen from "./screens/auth/SignupScreen";

const AfterAuthNavigationContainers = () => {
  const Stack = createNativeStackNavigator();
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
      </Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const StackNavigator = () => {
  // const { user } = useCurrentUser();
  const user = false;
  if (user) {
    return <AfterAuthNavigationContainers />;
  }
  return <BeforeAuthNavigationContainers />;
};

export default StackNavigator;
