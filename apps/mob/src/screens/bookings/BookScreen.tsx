import { ScrollView, Text, View, RefreshControl } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";

import Divider from "../../components/ui/Divider";
import BookNowButton from "../../components/ui/BookNowButton";
import {
  BOOKING_STATUS,
  IBookings,
  PAYMENT_METHOD,
  createRatingStars,
  useCreateBooking,
} from "core";
import {
  Days,
  addTimeToDate,
  generateDaysForMonth,
  generateMonths,
  generateTimeSlots,
  getDateByDayAndMonth,
} from "core";
import { RootStackParamList } from "../../StackNavigator";
import { useFutsalsStore } from "core";
import useCurrentUser from "../../hooks/useCurrentUser";
import Loading from "../../components/ui/Loading";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import useBookings from "../../hooks/useBookings";
import useRefetch from "../../hooks/useRefetch";
import ModalComponent from "../../components/ui/ModalComponent";
import { MonthSelector } from "./MonthSelector";
import { WeekSlider } from "./WeekSlider";
import { TimeSlots } from "./TimeSlots";
type BookScreenRouteProps = RouteProp<RootStackParamList, "Booking">;

interface BookScreenProps {
  route: BookScreenRouteProps;
}

const BookScreen = ({ route }: BookScreenProps) => {
  const { futsals } = useFutsalsStore();
  const { futsalId } = route.params;

  const futsal = futsals.filter((f) => f.id === futsalId)[0];
  const { ratings, futsalName, price } = futsal;

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Book a ground",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);

  const MONTHS = generateMonths();
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const DAYS = generateDaysForMonth(MONTHS[monthIndex].value);
  const [selectedDay, setSelectedDay] = useState<Days>(DAYS[0]);
  const { user } = useCurrentUser();
  const { mutate: createBooking, isLoading } = useCreateBooking();
  const { fetchingData, DateStatusMap, refetch, bookingData } =
    useBookings(futsalId);
  const { refreshing, onRefresh } = useRefetch(refetch);

  const [isModalVisible, setModalVisible] = useState(false);

  const _bookingDefaultValue: IBookings = {
    bookedByUser: {
      id: user.id,
      name: user.fullname,
      email: user.email,
    },
    bookedToFutsal: {
      id: futsalId,
      name: futsal.futsalName,
    },
    bookedFor: "",
    hasExpired: false,
    hasPaid: false,
    paymentMethod: PAYMENT_METHOD.ESEWA,
    price: futsal.price,
    status: BOOKING_STATUS.PENDING,
    createdAt: Date.now(),
    createdBy: {
      id: user.id,
      email: user.email,
      name: user.fullname,
    },
  };

  const currentDate = getDateByDayAndMonth(
    selectedDay.date,
    MONTHS[monthIndex].value + 1,
    "2023"
  );

  const TIME_SLOTS = generateTimeSlots(
    currentDate,
    selectedDay.week,
    MONTHS[monthIndex].value + 1,
    +futsal.openTime.split(":")[0],
    +futsal.closeTime.split(":")[0],
    60
  );

  const [currentTimeSlot, setCurrentTimeSlot] = useState<string | null>("");

  function increaseMonthIndex() {
    setMonthIndex((prev) => {
      if (prev === 11) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }
  function decreaseMonthIndex() {
    setMonthIndex((prev) => {
      if (prev === 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  }

  useEffect(() => {
    setSelectedDay(DAYS[0]);
  }, [monthIndex, futsalId]);

  useEffect(() => {
    // Quick fix need to work on it.
    refetch();
  }, []);

  if (isLoading || fetchingData) {
    return <Loading />;
  }

  return (
    <View className="relative pb-[50px]">
      <ModalComponent
        isVisible={isModalVisible}
        setIsVisible={setModalVisible}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4">
          <Text className="text-center text-xs">Select your timing</Text>
          <Text className="text-center font-bold text-xl">{futsalName}</Text>
          <Text className="text-yellow text-xl font-bold text-center">
            {createRatingStars(ratings)}
          </Text>
        </View>
        <Divider />
        <MonthSelector
          selectedMonth={MONTHS[monthIndex]}
          increaseMonthIndex={increaseMonthIndex}
          decreaseMonthIndex={decreaseMonthIndex}
        />
        <Divider />
        <WeekSlider
          days={DAYS}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
        />
        <Divider />
        <TimeSlots
          dateStatusMap={DateStatusMap}
          timeSlots={TIME_SLOTS.timeSlots}
          setCurrentTimeSlot={setCurrentTimeSlot}
          currentDate={currentDate}
        />
      </ScrollView>
      {TIME_SLOTS.timeSlots.length ? (
        <View className="fixed bottom-0 mx-2 bg-transparent">
          <BookNowButton
            onPress={() => {
              const date = addTimeToDate(currentDate, currentTimeSlot);
              bookingData &&
                bookingData.push({
                  ..._bookingDefaultValue,
                  bookedFor: date.toString(),
                });
              createBooking(
                {
                  ..._bookingDefaultValue,
                  bookedFor: date.toString(),
                },
                {
                  onSuccess: () => {
                    setModalVisible(true);
                  },
                  onError: () => {
                    Toast.show({
                      type: "error",
                      text1: "Oops",
                      text2: "Something went wrong.",
                    });
                  },
                }
              );
            }}
            label={`Book for Rs. ${price.toString()}`}
            className={`py-4 rounded-2xl w-[90%] m-auto ${
              !currentTimeSlot ? "bg-gray-400" : "bg-primary"
            }`}
            disabled={!currentTimeSlot}
          />
        </View>
      ) : null}
    </View>
  );
};

export default BookScreen;
