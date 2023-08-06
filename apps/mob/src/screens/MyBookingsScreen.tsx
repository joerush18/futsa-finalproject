import {
  Text,
  View,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";
import Card from "../components/ui/Card";
import { BOOKING_STATUS, formatBookingDate, timeAgo } from "core";
import Loading from "../components/ui/Loading";
import useYourBookings from "../hooks/useYourBookings";

const MyBookingsScreen = () => {
  const navigation = useNavigation();
  const { fetchingData, bookings, refreshing, onRefresh } = useYourBookings();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Bookings",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);

  if (fetchingData) {
    return <Loading />;
  }
  if (!bookings) {
    return (
      <View>
        <Text>No data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="px-2"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className="text-l font-bold mt-4 text-gray-700 ml-2">Today</Text>
      {bookings.length > 0
        ? bookings.map((booking) => {
            return (
              <BookingInfo
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Booking-Detail", {
                    bookingId: booking.id?.toString() ?? "",
                  });
                }}
                id={booking.id?.toString() ?? ""}
                fname={booking.bookedToFutsal.name ?? ""}
                date={formatBookingDate(booking.bookedFor)}
                moment={timeAgo(booking.updatedAt ?? booking.createdAt)}
                status={booking.status}
                payment={`${booking.hasPaid ? "Paid" : "Not Paid"} (${
                  booking.paymentMethod
                })`}
              />
            );
          })
        : null}
    </ScrollView>
  );
};

export default MyBookingsScreen;

interface BookingInfoProps {
  id: string;
  fname: string;
  date: string;
  moment: string;
  status: string;
  payment: string;
  onPress: () => void;
}

const BookingInfo = ({
  id,
  fname,
  date,
  moment,
  status,
  payment,
  onPress,
}: BookingInfoProps) => {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View className="flex-row items-center gap-5">
          <View>
            <Text>#{id}</Text>
            <Text className=" font-bold text-gray-700">{fname}</Text>
            <Text className="text-xs font-bold text-gray-400">{date}</Text>
          </View>
          <View>
            <Text
              className={`${
                status === BOOKING_STATUS.PENDING
                  ? "text-yellow"
                  : status === BOOKING_STATUS.BOOKED
                  ? "text-green-600"
                  : "text-rose-500"
              } capitalize`}
            >
              {status}
            </Text>
            <Text className="text-primary text-xs">{payment}</Text>
            <Text className="text-gray-400 text-xs">{moment}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};
