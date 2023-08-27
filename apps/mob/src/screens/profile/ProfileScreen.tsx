import { ScrollView, View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import OptionsCard from "../../components/OptionCard";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "../../components/ui/Avatar";
import { useLogout } from "core/src/db/hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { mutate: logout } = useLogout();
  const { user } = useCurrentUser();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Profile",
      headerTitleStyle: {
        fontSize: 20,
        color: "white",
      },
      headerLeft: () => {
        return (
          <MaterialCommunityIcons
            name="account-circle"
            size={24}
            color="white"
            style={{ marginLeft: 12 }}
          />
        );
      },
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerRight: () => {
        return (
          <AntDesign
            name="poweroff"
            size={18}
            color="white"
            style={{ marginRight: 20 }}
            onPress={() => {
              logout();
            }}
          />
        );
      },
    });
  }, []);
  return (
    <ScrollView>
      <View className="w-full bg-primary flex-col items-center justify-center py-3">
        <Avatar />
        <Text className="text-white font-bold text-xl">{user?.fullname}</Text>
        <Text className="text-white  text-sm">{user?.phonenumber}</Text>
        <Text className="text-white text-sm">{user?.email}</Text>
      </View>
      <View className="p-4">
        <OptionsCard
          label="Your Bookings"
          onPress={() =>
            // @ts-ignore
            navigation.navigate("My-Bookings")
          }
        >
          <Ionicons name="book" size={36} color={color.primary} />
        </OptionsCard>
        <OptionsCard
          label="My team"
          onPress={() =>
            // @ts-ignore
            navigation.navigate("My-Teams")
          }
        >
          <Ionicons name="person-sharp" size={36} color={color.primary} />
        </OptionsCard>
        <OptionsCard
          label="My Events"
          onPress={() =>
            // @ts-ignore
            navigation.navigate("My-Teams")
          }
        >
          <MaterialIcons name="event" size={36} color={color.yellow} />
        </OptionsCard>
        <OptionsCard label="Saved">
          <Ionicons name="heart-circle" size={36} color={color.primary} />
        </OptionsCard>
        <OptionsCard label="Edit">
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={36}
            color={color.yellow}
          />
        </OptionsCard>
        <OptionsCard label="Settings">
          <Ionicons name="settings" size={34} color={color.primary} />
        </OptionsCard>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;