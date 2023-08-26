import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabLabel from "../components/ui/TabLabel";
import color from "../assets/colors";
import MapViewScreen from "../screens/MapViewScreen";
import EventScreen from "../screens/events/EventScreen";
import RequestsScreen from "../screens/request/RequestsScreen";

const HomeBottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Home" focused={focused} />
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color={color.primary} />
            ) : (
              <AntDesign name="home" size={24} color={color.grayLight} />
            ),
        }}
      />
      <Tab.Screen
        name="Futsals"
        component={MapViewScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Maps" focused={focused} />
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="soccer-field"
              size={24}
              color={focused ? color.primary : color.grayLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Events" focused={focused} />
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="event"
              size={24}
              color={focused ? color.primary : color.grayLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My requests"
        component={RequestsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="My requests" focused={focused} />
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="request-quote"
              size={24}
              color={focused ? color.primary : color.grayLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Profile" focused={focused} />
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-outline" : "person"}
              size={24}
              color={focused ? color.primary : color.grayLight}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabs;
