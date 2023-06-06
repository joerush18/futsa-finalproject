import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../assets/colors";
import { FontAwesome } from "@expo/vector-icons";

const FutsalImageCard = () => {
  const [love, setLoved] = useState(false);
  return (
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
          uri: "https://1.bp.blogspot.com/-bBgD--rBiOg/Xi7oiO63yOI/AAAAAAAAHi4/MF7YQ_2y3nEArkdIDwOR1GCMvBxpCCeUQCEwYBhgL/w1200-h630-p-k-no-nu/footsal-ground-inside-kathmandu-valley-min.jpg",
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
              letterSpacing: 1,
            }}
          >
            Hardik Futsal
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
            3.5
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
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
            5 mins
          </Text>
          <Text
            style={{
              color: color.grayLight,
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
              color: color.grayLight,
              fontWeight: "bold",
            }}
          >
            Rs 450 - Rs 550 per hour
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FutsalImageCard;
