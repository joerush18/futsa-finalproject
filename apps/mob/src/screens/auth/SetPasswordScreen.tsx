import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../../components/ui/Card";
import InputComponent from "../../components/ui/InputComponent";
import Button from "../../components/ui/Button";
import color from "../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSetSchema } from "core/src/validations/validations";

const SetPasswordScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Login" as never);
  };

  const handleSignUp = (data: any) => {
    console.log(data);
    // final step of signup
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PasswordSetSchema),
  });
  return (
    <SafeAreaView className="p-5">
      <MaterialCommunityIcons name="soccer" size={36} color={color.primary} />
      <Text className="text-primary font-bold text-md mb-2">FUTSA</Text>
      <Card>
        <Text className="text-2xl font-bold opacity-60">Set Password</Text>
        <InputComponent
          label="New password"
          secure
          control={control}
          name="password"
          error={errors.password?.message}
        />
        <InputComponent
          label="Confirm New password"
          secure
          name="confirmPassword"
          control={control}
          error={errors.confirmPassword?.message}
        />
        <Button className="mt-2 mb-4" onPress={handleSubmit(handleSignUp)}>
          <Text className="text-center text-white font-bold py-2">
            Set Password
          </Text>
        </Button>
      </Card>
      <Pressable onPress={handleNavigate} className="mt-4">
        <Text className="text-sm opacity-60 text-center text-grayText font-bold">
          Back to Login
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;
