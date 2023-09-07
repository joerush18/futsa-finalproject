import { Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../assets/colors";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";

const Logo = require("../../assets/images/logo.png");

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="flex-col items-center justify-center gap-4 mt-36">
        {/* <MaterialCommunityIcons
          name="soccer"
          size={48}
          color={color.primary}
          style={{ marginLeft: 12 }}
        /> */}

        {/* <Text className="text-primary font-bold text-xl mb-6">FUTSA</Text> */}
        {/* Image */}
        <Image source={Logo} className="h-36 w-36 " />
        <Text className="text-sm text-center px-10 text-gray-500">
          Step onto the futsal pitch of possibilities with FUTSA Where every
          kick writes a story.
        </Text>
        <View className="w-full px-10">
          <Button
            className="py-4"
            onPress={() => navigation.navigate("Login" as never)}
          >
            <Text className="text-center text-white font-bold">Login</Text>
          </Button>
          <Button
            className="mt-2 bg-white border-[1px] border-gray-300 py-4"
            onPress={() => navigation.navigate("Signup" as never)}
          >
            <Text className="text-center text-primary font-bold">
              Signup using email
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
