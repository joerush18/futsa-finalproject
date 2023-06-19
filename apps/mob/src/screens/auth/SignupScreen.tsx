import { Text, Pressable, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../assets/colors";
import Card from "../../components/ui/Card";
import InputComponent from "../../components/ui/InputComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Login" as never);
  };
  const handleSignUp = () => {};
  return (
    <SafeAreaView className="p-5">
      <MaterialCommunityIcons name="soccer" size={36} color={color.primary} />
      <Text className="text-primary font-bold text-md mb-2">FUTSA</Text>
      <Card>
        <Text className="text-2xl font-bold opacity-60">Sign up</Text>
        <InputComponent label="Full name" />
        <InputComponent label="Phone number" />
        <Button className="mt-2 mb-4">
          <Text className="text-center text-white font-bold py-2">Signup</Text>
        </Button>
      </Card>
      <Text className="text-sm opacity-60 text-center mt-8">
        By clicking the Signup button, I agree to the terms and conditions of
        futsa.
      </Text>
      <View className="flex-row items-center mt-8 mx-auto">
        <Text className="text-sm opacity-60 text-center ">
          Already have an account ?{" "}
        </Text>
        <Pressable onPress={handleNavigate}>
          <Text className="text-sm opacity-60 text-center text-primary font-bold">
            Login Now
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
