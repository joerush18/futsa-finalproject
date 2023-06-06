import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "./ui/Card";
import BookNowButton from "./ui/BookNowButton";
import { Pressable, View, Image, Text } from "react-native";
import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";

const FutsalCard = () => {
  const [love, setLoved] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("Futsal-Detail" as never);
  };

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
            uri: "https://1.bp.blogspot.com/-bBgD--rBiOg/Xi7oiO63yOI/AAAAAAAAHi4/MF7YQ_2y3nEArkdIDwOR1GCMvBxpCCeUQCEwYBhgL/w1200-h630-p-k-no-nu/footsal-ground-inside-kathmandu-valley-min.jpg",
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
              Hardik Futsal
            </Text>
            <FontAwesome name="star" size={12} color={color.yellow} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              3.5
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
              | Sankhamul Chowk
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
              Rs 450 - Rs 550 per hour
            </Text>
          </View>
          <BookNowButton onPress={handleNavigation} />
        </View>
      </View>
    </Card>
  );
};

export default FutsalCard;
