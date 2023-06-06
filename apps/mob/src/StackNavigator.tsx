import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./screens/SearchScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeBottomTabs from "./tabs/HomeBottomTabs";
import FutsalDetailScreen from "./screens/FutsalDetailScreen";
import NotificationScreen from "./screens/NotificationScreen";
import FilterScreen from "./screens/FilterScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BeforeAuthNavigationContainers = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const StackNavigator = () => {
  // const { user } = useCurrentUser();
  const user = true;
  if (user) {
    return <AfterAuthNavigationContainers />;
  }
  return <BeforeAuthNavigationContainers />;
};

export default StackNavigator;
