import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "./ui/Card";
import BookNowButton from "./ui/BookNowButton";
import { Pressable, View, Image, Text } from "react-native";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { IFutsal } from "core/src/types/futsals.types";

interface FutsalCardProps {
  futsal: IFutsal;
}

const FutsalCard = ({ futsal }: FutsalCardProps) => {
  const { futsalName, ratings, address, price, id, coverPicture } = futsal;
  console.log(id);
  const [love, setLoved] = useState(false);
  const navigation = useNavigation();

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
              color={color.grayText}
            />
            <Text
              style={{
                color: color.grayText,
              }}
            >
              5 mins
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
