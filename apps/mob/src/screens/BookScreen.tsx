import { ScrollView, Text, View, RefreshControl } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import color from "../assets/colors";

import { Entypo } from "@expo/vector-icons";
import Divider from "../components/ui/Divider";
import IconButton from "../components/ui/IconButton";
import Sectionlayout from "../components/layout/Sectionlayout";
import BookNowButton from "../components/ui/BookNowButton";
import {
  BOOKING_STATUS,
  IBookings,
  PAYMENT_METHOD,
  createRatingStars,
  useCreateBooking,
} from "core";
import {
  Days,
  MonthInfo,
  addTimeToDate,
  generateDaysForMonth,
  generateMonths,
  generateTimeSlots,
  getDateByDayAndMonth,
} from "core";
import { RootStackParamList } from "../StackNavigator";
import { useFutsalsStore } from "core";
import useCurrentUser from "../hooks/useCurrentUser";
import Loading from "../components/ui/Loading";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import useBookings from "../hooks/useBookings";
import useRefetch from "../hooks/useRefetch";
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
              try {
                createBooking({
                  ..._bookingDefaultValue,
                  bookedFor: date.toString(),
                });
                Toast.show({
                  type: "success",
                  text1: "Success",
                  text2: "You have successfully booked.",
                });
              } catch (e) {
                Toast.show({
                  type: "error",
                  text1: "Oops",
                  text2: "Something went wrong.",
                });
              }
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

interface MonthSelectorProps {
  selectedMonth: MonthInfo;
  increaseMonthIndex: () => void;
  decreaseMonthIndex: () => void;
}
const MonthSelector = ({
  selectedMonth,
  increaseMonthIndex,
  decreaseMonthIndex,
}: MonthSelectorProps) => {
  return (
    <View className="flex-row justify-between mx-4 py-4 items-center">
      <Entypo
        name="chevron-left"
        size={24}
        color={color.grayText}
        onPress={() => decreaseMonthIndex()}
      />
      <Text className="text-primary font-bold">{selectedMonth.name}</Text>
      <Entypo
        name="chevron-right"
        size={24}
        color={color.grayText}
        onPress={() => increaseMonthIndex()}
      />
    </View>
  );
};

interface WeekSliderProps {
  days: Days[];
  selectedDay: Days;
  setSelectedDay: React.Dispatch<React.SetStateAction<Days>>;
}
const WeekSlider = ({ days, selectedDay, setSelectedDay }: WeekSliderProps) => {
  return (
    <ScrollView
      className="mx-4 py-2"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {days?.map((day, index) => {
        const { date, week } = day;
        const isSelected =
          selectedDay.date === date && selectedDay.week === week;
        return (
          <WeekComponent
            key={`weekDay_${index}`}
            index={index}
            isSelected={isSelected}
            setSelected={setSelectedDay}
            day={day}
          />
        );
      })}
    </ScrollView>
  );
};

interface WeekComponentProps {
  index: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<Days>>;
  day: Days;
}

const WeekComponent = ({
  index,
  isSelected,
  setSelected,
  day,
}: WeekComponentProps) => {
  const { date, week } = day;
  return (
    <IconButton
      onPress={() => setSelected(day)}
      className={`mx-1 p- min-w-[60px] ${
        isSelected ? "bg-primary text-white" : ""
      }`}
    >
      <Text
        className={`text-center font-bold text-lg ${
          isSelected ? "text-white" : ""
        }`}
      >
        {date}
      </Text>
      <Text
        className={`text-center font-bold text-gray-600  ${
          isSelected ? "text-white opcaity-100" : ""
        }`}
      >
        {week.slice(0, 3)}
      </Text>
    </IconButton>
  );
};
interface TimeSlotProps {
  timeSlots: string[];
  setCurrentTimeSlot: React.Dispatch<React.SetStateAction<string | null>>;
  dateStatusMap: Map<string, string>;
  currentDate: Date;
}

const TimeSlots = ({
  timeSlots,
  setCurrentTimeSlot,
  dateStatusMap,
  currentDate,
}: TimeSlotProps) => {
  const [selected, setSelected] = useState<number>(NaN);
  return (
    <Sectionlayout title="Select Available Time Slot">
      <View className="flex-row w-full flex-wrap items-center justify-between flex-2">
        {timeSlots.length ? (
          timeSlots.map((timeSlot, index) => {
            const isSelected = index === selected;
            const date = addTimeToDate(currentDate, timeSlot);
            const formattedDate = date.toString().split(" ").join("_");
            const status = dateStatusMap.get(formattedDate);
            return (
              <TimeSlotComponent
                key={`timeslot_${index}`}
                index={index}
                isSelected={isSelected}
                setSelected={setSelected}
                timeslot={timeSlot}
                setCurrentTimeSlot={setCurrentTimeSlot}
                status={status}
              />
            );
          })
        ) : (
          <Text>No timeslots available.</Text>
        )}
      </View>
    </Sectionlayout>
  );
};

interface TimeSlotComponentProps {
  index: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  timeslot: string;
  setCurrentTimeSlot: React.Dispatch<React.SetStateAction<string | null>>;
  status?: string;
}
const TimeSlotComponent = ({
  index,
  isSelected,
  setSelected,
  timeslot,
  setCurrentTimeSlot,
  status,
}: TimeSlotComponentProps) => {
  const isBooked = status === BOOKING_STATUS.BOOKED;
  const isPending = status === BOOKING_STATUS.PENDING;
  return (
    <IconButton
      className={`px-5 py-4 rounded-2xl my-2 min-w-[170px] ${
        isPending
          ? "bg-yellow disabled"
          : isBooked
          ? "bg-green-600 disabled"
          : isSelected
          ? "bg-primary"
          : ""
      }`}
      onPress={() => {
        setCurrentTimeSlot((prev) => {
          if (prev === timeslot) {
            setSelected(NaN);
            return null;
          }
          return timeslot;
        });
        setSelected(index);
      }}
      disabled={isBooked || isPending}
    >
      <Text
        className={`text-md font-bold text-center ${
          isPending || isBooked || isSelected
            ? "text-white disabled"
            : isSelected
            ? "bg-primary"
            : ""
        } `}
      >
        {timeslot}
      </Text>
    </IconButton>
  );
};
