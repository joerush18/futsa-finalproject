import { View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import color from "../assets/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../components/ui/Loading";

import { WebView } from "react-native-webview";
import usePayment from "../hooks/usePayment";
import IconButton from "../components/ui/IconButton";
import { RootStackParamList } from "../StackNavigator";

type PaymentScreenRouteProps = RouteProp<RootStackParamList, "Payment">;

interface FutsalDetailScreenProps {
  route: PaymentScreenRouteProps;
}

const PaymentScreen = ({ route }: FutsalDetailScreenProps) => {
  const { paymentData } = route.params;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Khalti : Pay Now",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerLeft: () => {
        return (
          <MaterialIcons
            name="payment"
            size={24}
            color="white"
            style={{ marginRight: 12 }}
          />
        );
      },
    });
  }, []);

  const { isLoading, webUrl } = usePayment({ ...paymentData });

  if (!webUrl && isLoading) {
    return (
      <View className="flex-1">
        <Loading />
      </View>
    );
  }

  return (
    <View className="flex- h-full relative">
      <WebView source={{ uri: webUrl }} style={{ flex: 1 }} />
      {true ? (
        <IconButton
          className="absolute bottom-8 right-8 z-10 bg-violet-800 rounded-full h-16 w-16 flex items-center justify-center shadow-md"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("Main");
          }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={color.white}
          />
        </IconButton>
      ) : null}
    </View>
  );
};

export default PaymentScreen;
