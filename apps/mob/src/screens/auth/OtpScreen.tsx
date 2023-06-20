import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../assets/colors";
import Card from "../../components/ui/Card";
import InputComponent from "../../components/ui/InputComponent";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";

const OtpScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Login" as never);
  };
  const verifyOTP = () => {
    navigation.navigate("password" as never);
  };

  const { control, handleSubmit } = useForm();
  return (
    <SafeAreaView className="p-5">
      <MaterialCommunityIcons name="soccer" size={36} color={color.primary} />
      <Text className="text-primary font-bold text-md mb-2">FUTSA</Text>
      <Card>
        <Text className="text-2xl font-bold opacity-60">Enter OTP</Text>
        <Text className="text-sm opacity-60 mt-2">
          Enter the one-time-pin sent to your phone number or email address.
        </Text>
        <InputComponent label="OTP" control={control} name="OTP" />
        {/* <InputComponent label="Password" secure={true} /> */}

        <Button className="mt-3 mb-4" onPress={verifyOTP}>
          <Text className="text-center text-white font-bold py-2">Verify</Text>
        </Button>
        <Pressable className="my-2">
          <Text className="text-sm text-gray-400 ml-1 text-center font-bold">
            4:50 sec
          </Text>
        </Pressable>
      </Card>

      <View className="flex-row items-center mt-8 mx-auto mb-2">
        <Text className="text-sm opacity-60 text-center ">
          Didn't receive code ?{" "}
        </Text>
        <Pressable onPress={handleSubmit(verifyOTP)}>
          <Text className="text-sm opacity-60 text-center text-primary font-bold">
            Resend OTP
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={handleNavigate}>
        <Text className="text-sm opacity-60 text-center text-grayText font-bold">
          Back to Login
        </Text>
      </Pressable>

      {/* Social logins */}
    </SafeAreaView>
  );
};

export default OtpScreen;
