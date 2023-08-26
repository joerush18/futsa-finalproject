import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import { RootStackParamList } from "../../StackNavigator";

import { Ionicons } from "@expo/vector-icons";
import {
  BOOKING_STATUS,
  IBookings,
  formatBookingDate,
  useBookingStore,
  useUpdateBooking,
} from "core";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import usePayment from "../../hooks/usePayment";
import { paymentData } from "../../utils/paymentData";
import Loading from "../../components/ui/Loading";

type BookDetailScreenRouteProps = RouteProp<
  RootStackParamList,
  "Booking-Detail"
>;

interface BookDetailsScreenProps {
  route: BookDetailScreenRouteProps;
}

const BookDetailsScreen = ({ route }: BookDetailsScreenProps) => {
  const { bookingId } = route.params;
  const { userBookings } = useBookingStore();
  const navigation = useNavigation();
  const booking = userBookings.find((b) => b.id === bookingId);
  const { mutate: updateBooking, isLoading } = useUpdateBooking();

  const cancelBooking = () => {
    updateBooking(
      {
        id: bookingId,
        status: BOOKING_STATUS.CANCELLED,
        hasExpired: true,
        updatedAt: +new Date(),
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Booking cancelled",
            text2: "Your booking has been cancelled successfully.",
          });
          navigation.goBack();
        },
      }
    );
  };
  const _data = paymentData(booking ?? ({} as IBookings));

  return (
    <View style={styles.container}>
      <View className="mt-7 ml-2">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </View>
      <View className=" mt-40 mb-4 py-10 rounded-xl bg-white pt-16 flex items-center relative">
        <Image
          // source={require("../assets/images/firstpage.png")}
          source={{
            uri: "https://thumbs.dreamstime.com/b/football-futsal-shield-logo-vector-premium-design-concept-football-futsal-shield-logo-vector-169843661.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            borderRadius: 15,
          }}
          className="absolute top-[-50px] left-[37%]  z-10 bg-white"
        />
        <Text className="text-gray-800 font-bold">
          {booking?.bookedToFutsal?.name ?? ""}
        </Text>
        <Text className=" opacity-60">Rs. {booking?.price ?? ""}</Text>
        <View className="flex-row  mt-2">
          <Text
            className={`px-3 py-1 mr-2 text-white rounded-xl capitalize ${
              booking?.status === BOOKING_STATUS.PENDING
                ? "bg-yellow"
                : booking?.status === BOOKING_STATUS.BOOKED
                ? "bg-green-600"
                : "bg-rose-500"
            }`}
          >
            {booking?.status ?? ""}
          </Text>
          <Text
            className={`px-3 py-1 ${
              booking?.hasPaid ? "bg-green-600" : "bg-rose-500"
            } text-white rounded-xl`}
          >
            {booking?.hasPaid ? "Paid" : "Not Paid" ?? ""}
          </Text>
        </View>
        <View className="flex-row  items-center justify-between w-full px-10">
          <TextLabel
            label="Booking Id"
            value={`${bookingId.slice(0, 14)} ***** - *****`}
          />
          <TextLabel
            label="Payment"
            value={booking?.paymentMethod.toString() ?? ""}
          />
        </View>
        <View className="flex-row  items-center justify-between w-full px-10">
          <TextLabel
            label="Date"
            value={
              formatBookingDate(booking?.bookedFor ?? "")
                .split(" ")
                .slice(0, 3)
                .join(" ") ?? ""
            }
          />
          <TextLabel
            label="Time"
            value={
              formatBookingDate(booking?.bookedFor ?? "")
                .split(" ")
                .slice(3, 5)
                .join(" ") ?? ""
            }
          />
        </View>
      </View>
      {booking?.status === BOOKING_STATUS.PENDING ? (
        <Text className="text-center text-white my-2 text-xs">
          Someone from the futsal will accept your request and will contact you
          soon.
        </Text>
      ) : null}

      <View className="flex-row my-4 items-center justify-center space-x-3 ">
        {booking?.status !== BOOKING_STATUS.REJECTED &&
        booking?.status !== BOOKING_STATUS.CANCELLED &&
        !booking?.hasPaid ? (
          <TouchableOpacity
            onPress={async () => {
              // @ts-ignore
              navigation.navigate("Payment", {
                paymentData: _data,
              });
            }}
            className=" p-4 bg-violet-800 rounded-md"
          >
            <Text className="text-center text-white font-bold">Pay now</Text>
          </TouchableOpacity>
        ) : null}
        {booking?.status !== BOOKING_STATUS.REJECTED &&
        booking?.status !== BOOKING_STATUS.CANCELLED ? (
          <TouchableOpacity
            onPress={cancelBooking}
            className="p-4 bg-rose-600 rounded-md"
          >
            <Text className="text-center text-white font-bold">
              {isLoading ? "Canceling..." : "Cancel Booking"}
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="p-4 bg-white rounded-md"
        >
          <Text className="text-center text-primary">Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color.primary,
    position: "relative",
  },
});

const TextLabel = ({ label, value }: { label: string; value: string }) => {
  return (
    <View>
      <Text className=" text-sm mt-5 text-gray-400 capitalize">{label}</Text>
      <Text className=" text-sm text-green-700 font-bold capitalize">
        {value}
      </Text>
    </View>
  );
};
