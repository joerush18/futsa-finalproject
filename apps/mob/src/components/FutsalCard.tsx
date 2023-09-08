import React, { useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import Card from "./ui/Card";
import BookNowButton from "./ui/BookNowButton";
import { Pressable, View, Image, Text } from "react-native";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { IFutsal, useCurrentLocation } from "core";
import { calculateDistance, calculateTravelTime } from "../utils/location";
import { convertMinutesToHours } from "../utils/date";

interface FutsalCardProps {
  futsal: IFutsal;
}

const FutsalCard = ({ futsal }: FutsalCardProps) => {
  const { futsalName, ratings, address, price, id, coverPicture } = futsal;
  const [love, setLoved] = useState(false);
  const navigation = useNavigation();
  const { geoLocation: currentLocation } = useCurrentLocation();

  const timeDistance = calculateDistance(
    currentLocation?.lat ?? 0,
    currentLocation?.lng ?? 0,
    futsal?.geoLocation?.lat ? +futsal.geoLocation?.lat : 0,
    futsal.geoLocation?.lng ? +futsal.geoLocation?.lng : 0
  );

  const handleNavigation = () => {
    // @ts-ignore
    navigation.navigate(`Futsal-Detail`, {
      futsalId: id,
    });
  };

  if (!futsal) return null;

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            bottom: 0,
            opacity: 0.5,
            borderRadius: 15,
            zIndex: 20,
          }}
          onTouchStart={() => setLoved((prev) => !prev)}
        >
          <AntDesign
            name={`${love ? "heart" : "hearto"}`}
            size={24}
            color={color.primary}
          />
        </Pressable>
        <Image
          source={{
            uri: coverPicture,
          }}
          style={{
            width: 100,
            resizeMode: "contain",
            borderRadius: 15,
          }}
        />
        <View
          style={{
            alignItems: "flex-start",
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {futsalName}
            </Text>
            <FontAwesome name="star" size={12} color={color.yellow} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {ratings}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              opacity: 0.6,
            }}
          >
            <MaterialCommunityIcons
              name="walk"
              size={12}
              color={color.grayLight}
            />
            <Text
              style={{
                color: color.grayText,
              }}
            >
              {Math.floor(timeDistance)} km
            </Text>
            <Text
              style={{
                color: color.grayText,
              }}
            >
              |{" " + address.city + " " + address.street}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Text
              style={{
                color: color.primary,
                fontWeight: "bold",
              }}
            >
              Rs {price} per hour
            </Text>
          </View>
          <BookNowButton onPress={handleNavigation} />
        </View>
      </View>
    </Card>
  );
};

export default FutsalCard;
