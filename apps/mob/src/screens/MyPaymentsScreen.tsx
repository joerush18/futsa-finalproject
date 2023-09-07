import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useLayoutEffect } from "react";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import useTransactions from "../hooks/useTransactions";
import Loading from "../components/ui/Loading";
import { ITransaction, timeAgo } from "core";
import Card from "../components/ui/Card";
import Empty from "../components/ui/Empty";

const MyPaymentsScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Payments",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);

  const { payments, isFetching, onRefresh, refreshing } = useTransactions();
  if (isFetching) return <Loading />;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="px-2"
      showsVerticalScrollIndicator={false}
    >
      {payments?.length ? (
        payments.map((payment, index) => (
          <PaymentCard payment={payment} key={`payment_${index}`} />
        ))
      ) : (
        <View className="mx-auto">
          <Empty />
        </View>
      )}
    </ScrollView>
  );
};

export default MyPaymentsScreen;

const PaymentCard = ({ payment }: { payment: ITransaction }) => {
  return (
    <Card>
      <Text className="text-sm text-gray-500">
        TnxId : {payment.transactionId}
      </Text>
      <Text className="text-md font-bold text-rose-400">
        - Rs . {payment.amount}
      </Text>
      <Text className="text-sm text-gray-500">
        Payed to : {payment.payedTo.name}
      </Text>
      <Text className="text-sm text-gray-500 capitalize">
        {payment.payedfor.collection} : {payment.payedfor.id}
      </Text>

      <Text className="text-sm text-gray-500">{timeAgo(payment.payedAt)}</Text>
    </Card>
  );
};
