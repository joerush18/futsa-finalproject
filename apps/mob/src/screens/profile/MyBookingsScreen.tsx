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
import Empty from "../../components/ui/Empty";

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

  const totalBookings = bookings.length
    ? bookings.filter((e) => e.status === BOOKING_STATUS.BOOKED).length
    : 0;
  const maxBookings = 10;

  return (
    <>
      <View className="mx-2">
        <Card>
          <Text className="text-lg font-bold">
            Total Bookings : {totalBookings} / {maxBookings}
          </Text>
          <Text className="text-sm text-gray-500">
            {maxBookings - totalBookings} remains for the perks.
          </Text>
        </Card>
      </View>
      <ScrollView
        className="px-2"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {bookings.length > 0 ? (
          bookings.map((booking, index) => {
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
        ) : (
          <View className="mx-auto">
            <Empty />
          </View>
        )}
      </ScrollView>
    </>
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
        {!hasPaid ? (
          <View className="flex-row justify-end">
            <Text className="text-violet-800 font-bold text-center mt-2 border-[1px] rounded-md w-[100px] border-violet-800 px-2">
              Pay now
            </Text>
          </View>
        ) : null}
      </Card>
    </Pressable>
  );
};
