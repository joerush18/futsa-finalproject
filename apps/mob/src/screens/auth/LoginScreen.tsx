import { Text, Pressable, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../assets/colors";
import Card from "../../components/ui/Card";
import InputComponent from "../../components/ui/InputComponent";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../utils/validations/validations";

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleNavigateSignup = () => {
    navigation.navigate("Signup" as never);
  };

  const handleLogin = () => {};

  return (
    <SafeAreaView className="p-5">
      <MaterialCommunityIcons name="soccer" size={36} color={color.primary} />
      <Text className="text-primary font-bold text-md mb-2">FUTSA</Text>
      <Card>
        <Text className="text-2xl font-bold opacity-60">Login</Text>
        <InputComponent
          label="Phone number"
          control={control}
          name="phoneNumber"
          keyboardType="numeric"
          error={errors.phoneNumber?.message}
        />
        <InputComponent
          label="Password"
          secure={true}
          name="password"
          control={control}
          error={errors.password?.message}
        />
        <Pressable className="my-2">
          <Text className="text-sm text-gray-400 ml-1 font-bold">
            Forgot Password?
          </Text>
        </Pressable>
        <Button className="mt-1 mb-4" onPress={handleSubmit(handleLogin)}>
          <Text className="text-center text-white font-bold py-2">Login</Text>
        </Button>
      </Card>

      <View className="flex-row items-center mt-8 mx-auto mb-2">
        <Text className="text-sm opacity-60 text-center ">New to futsa? </Text>
        <Pressable onPress={handleNavigateSignup}>
          <Text className="text-sm opacity-60 text-center text-primary font-bold">
            Sign up Now
          </Text>
        </Pressable>
      </View>

      <Divider />

      <Text className="text-sm opacity-60 text-center "> Or login using </Text>

      <View className="flex-row items-center justify-center gap-4 mt-2">
        <AntDesign name="google" size={32} color={"#dd4b39"} />
        <AntDesign name="facebook-square" size={32} color={"#1877f2"} />
      </View>
      {/* Social logins */}
    </SafeAreaView>
  );
};

export default LoginScreen;
