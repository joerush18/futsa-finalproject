import { Text, Pressable, View, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../assets/colors";
import Card from "../../components/ui/Card";
import InputComponent from "../../components/ui/InputComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "core/src/validations/validations";
import { ISignUpCredentials, ROLES } from "core/src/types/users.types";
import { useSignupEmail } from "core/src/db/hooks/useAuth";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const SignupScreen = () => {
  const { mutate: signUpWithEmail, isLoading } = useSignupEmail();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpCredentials>({
    resolver: zodResolver(SignUpSchema),
  });
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Login" as never);
  };
  const handleSignUp = async (data: ISignUpCredentials) => {
    if (!data) return;
    const formData = {
      ...data,
      role: "player" as ROLES,
    };
    signUpWithEmail(formData, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Signed up successfully",
        });
        navigation.navigate("Main" as never);
      },
      onError: (data) => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Something went wrong",
        });
      },
    });
  };

  return (
    <SafeAreaView className="p-5">
      <MaterialCommunityIcons name="soccer" size={36} color={color.primary} />
      <Text className="text-primary font-bold text-md mb-2">FUTSA</Text>
      <Card>
        <Text className="text-2xl font-bold opacity-60">Sign up</Text>
        <InputComponent
          label="Full name"
          control={control}
          name="fullName"
          error={errors.fullName?.message}
        />
        <InputComponent
          label="Phone number"
          control={control}
          name="phoneNumber"
          error={errors.phoneNumber?.message}
          keyboardType="numeric"
        />
        <InputComponent
          label="Email"
          control={control}
          name="email"
          error={errors.email?.message}
        />
        <InputComponent
          label="Password"
          secure={true}
          name="password"
          control={control}
          error={errors.password?.message}
        />
        <InputComponent
          label="Confirm your password"
          secure
          name="confirmPassword"
          control={control}
          error={errors.confirmPassword?.message}
        />
        <Button className="mt-2 mb-4" onPress={handleSubmit(handleSignUp)}>
          {isLoading ? (
            <ActivityIndicator size="large" color={color.white} />
          ) : (
            <Text className="text-center text-white font-bold py-2">
              Sign up
            </Text>
          )}
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
