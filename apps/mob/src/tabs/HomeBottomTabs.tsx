import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import BookScreen from "../screens/BookScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabLabel from "../components/ui/TabLabel";
import color from "../assets/colors";
import MapViewScreen from "../screens/MapViewScreen";

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
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="soccer-field"
                size={24}
                color={color.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="soccer-field"
                size={24}
                color={color.grayLight}
              />
            ),
        }}
      />
      <Tab.Screen
        name="History"
        component={BookScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="History" focused={focused} />
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="history" size={24} color={color.primary} />
            ) : (
              <FontAwesome name="history" size={24} color={color.grayLight} />
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
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color={color.primary} />
            ) : (
              <Ionicons
                name="person-outline"
                size={24}
                color={color.grayLight}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabs;
