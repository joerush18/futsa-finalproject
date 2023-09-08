import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import color from "../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IFutsal, useCurrentLocation } from "core";
import { calculateDistance } from "../utils/location";

interface FutsalImageCardProps {
  futsal: IFutsal;
}

const FutsalImageCard = ({ futsal }: FutsalImageCardProps) => {
  const { coverPicture, futsalName, price, address, ratings, id } = futsal;
  const [love, setLoved] = useState(false);
  const navigation = useNavigation();
  const handleNavigation = () => {
    // @ts-ignore
    navigation.navigate("Futsal-Detail" as never, {
      futsalId: id,
    });
  };
  const { geoLocation: currentLocation } = useCurrentLocation();

  const timeDistance = calculateDistance(
    currentLocation?.lat ?? 0,
    currentLocation?.lng ?? 0,
    futsal?.geoLocation?.lat ? +futsal.geoLocation?.lat : 0,
    futsal.geoLocation?.lng ? +futsal.geoLocation?.lng : 0
  );

  return (
    <Pressable onPress={handleNavigation}>
      <View
        style={{
          height: 150,
          width: 250,
          position: "relative",
          marginRight: 10,
        }}
      >
        <Image
          source={{
            uri: coverPicture,
          }}
          style={{
            height: 150,
            width: 250,
            resizeMode: "contain",
            borderRadius: 15,
          }}
        />
        <Pressable
          style={{
            position: "absolute",
            top: 10,
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
            color={color.white}
          />
        </Pressable>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: 0.5,
            borderRadius: 15,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "5%",
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
                color: color.white,
                fontWeight: "bold",
                fontSize: 16,
                letterSpacing: 0.5,
              }}
            >
              {futsalName}
            </Text>
            <FontAwesome name="star" size={12} color="yellow" />
            <Text
              style={{
                color: color.white,
                fontWeight: "bold",
                fontSize: 16,
                letterSpacing: 1,
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
                color: color.grayLight,
              }}
            >
              {Math.floor(timeDistance)} km
            </Text>
            <Text
              style={{
                color: color.grayLight,
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
                color: color.grayLight,
                fontWeight: "bold",
              }}
            >
              Rs {price} per hour
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default FutsalImageCard;
