import {
  Text,
  View,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import Card from "../../components/ui/Card";
import { BOOKING_STATUS, formatBookingDate, timeAgo } from "core";
import Loading from "../../components/ui/Loading";
import useYourBookings from "../../hooks/useYourBookings";

const MyBookingsScreen = () => {
  const navigation = useNavigation();
  const { fetchingData, bookings, refreshing, onRefresh, refetch } =
    useYourBookings();
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

  useEffect(() => {
    refetch();
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
      {bookings.length > 0
        ? bookings.map((booking, index) => {
            return (
              <BookingInfo
                key={`booking_${index}`}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Booking-Detail", {
                    bookingId: booking.id?.toString() ?? "",
                  });
                }}
                id={booking.id?.toString() ?? ""}
                fname={booking?.bookedToFutsal?.name ?? ""}
                date={formatBookingDate(booking?.bookedFor)}
                moment={timeAgo(booking.createdAt)}
                status={booking?.status}
                payment={`${booking?.hasPaid ? "Paid" : "Not Paid"} (${
                  booking.hasPaid ? booking?.paymentMethod : "-"
                })`}
                hasPaid={booking?.hasPaid}
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
  hasPaid: boolean;
}

const BookingInfo = ({
  id,
  fname,
  date,
  moment,
  status,
  payment,
  onPress,
  hasPaid,
}: BookingInfoProps) => {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-gray-700">#{id}</Text>
            <Text className=" font-bold text-gray-600">{fname}</Text>
            <Text className="text-xs font-bold text-gray-400">{date}</Text>
          </View>
          <View className="flex-col items-end">
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
            <Text
              className={`text-xs capitalize ${
                hasPaid ? "text-violet-800" : "text-rose-800"
              }`}
            >
              {payment}
            </Text>
            <Text className="text-gray-400 text-xs">{moment}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};
