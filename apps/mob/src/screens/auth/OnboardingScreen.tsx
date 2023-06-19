import { Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../assets/colors";
import Image1 from "../../assets/images/firstpage.png";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="flex-col items-center justify-center gap-4 mt-10">
        <MaterialCommunityIcons
          name="soccer"
          size={48}
          color={color.primary}
          style={{ marginLeft: 12 }}
        />
        <Text className="text-primary font-bold text-xl mb-6">FUTSA</Text>
        {/* Image */}
        <Image source={Image1} className="h-48 w-60 " />
        <Text className="text-xl text-grayText font-bold opacity-50">
          Find Futsal !
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
              Signup using mobile number
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
