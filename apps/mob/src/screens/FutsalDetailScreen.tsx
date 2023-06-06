import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../assets/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Divider from "../components/ui/Divider";
import Sectionlayout from "../components/layout/Sectionlayout";
import { AntDesign } from "@expo/vector-icons";
import BookNowButton from "../components/ui/BookNowButton";
import MapView from "react-native-maps";
import Review from "../components/Review";
import IconText from "../components/ui/IconText";

const FutsalDetailScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full h-48 object-fit">
          <Image
            source={{
              uri: "https://1.bp.blogspot.com/-bBgD--rBiOg/Xi7oiO63yOI/AAAAAAAAHi4/MF7YQ_2y3nEArkdIDwOR1GCMvBxpCCeUQCEwYBhgL/w1200-h630-p-k-no-nu/footsal-ground-inside-kathmandu-valley-min.jpg",
            }}
            className="w-full h-48 object-cover aspect-auto"
          />
          <View className="absolute top-0 right-0 left-0 bottom-0 bg-black opacity-50 rounded-md"></View>
        </View>
        <View className="p-4">
          <ProfileInfo />
          <Text className="text-grayText mt-4 opacity-70">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
            illum, perspiciatis facere molestias exercitationem dolor, nulla
            ratione architecto aliquid.
          </Text>
        </View>
        <Divider />
        <Sectionlayout title="Amenities">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2 m-1"
          >
            {Array.from({ length: 4 }).map((_, idx) => {
              return (
                <IconText
                  label="Free Wifi"
                  icon={<AntDesign name="wifi" size={24} />}
                />
              );
            })}
          </ScrollView>
        </Sectionlayout>
        <Divider />
        <View className="flex-row justify-between items-center px-4 my-3">
          <Text className="font-bold text-sm">Opening Time</Text>
          <Text className="text-white bg-grayText p-1 rounded-md">
            Opens 9AM to 9PM
          </Text>
        </View>
        <Divider />
        <Sectionlayout title="Grounds">
          <GroundComponent />
        </Sectionlayout>
        <Divider />
        <Sectionlayout title="Location">
          <Location />
        </Sectionlayout>
        <Divider />
        <Sectionlayout title="Reviews">
          <Reviews />
        </Sectionlayout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FutsalDetailScreen;

const ProfileInfo = () => {
  return (
    <View className="flex-row gap-3">
      <Image
        source={{
          uri: "https://1.bp.blogspot.com/-bBgD--rBiOg/Xi7oiO63yOI/AAAAAAAAHi4/MF7YQ_2y3nEArkdIDwOR1GCMvBxpCCeUQCEwYBhgL/w1200-h630-p-k-no-nu/footsal-ground-inside-kathmandu-valley-min.jpg",
        }}
        className="w-20 object-contain rounded-md border-2"
      />
      <View className="flex-col item-start">
        <View className="flex-row items-center gap-1">
          <Text className="font-bold text-md">Hardik Futsal</Text>
          <FontAwesome name="star" size={12} color={color.yellow} />
          <Text className="font-bold text-md">3.5</Text>
        </View>
        <View className="flex-row items-center gap-1 opacity-60">
          <MaterialCommunityIcons
            name="walk"
            size={12}
            color={color.grayText}
          />
          <Text className=" text-grayText">5 mins</Text>
          <Text className=" text-grayText">| Sankhamul Chowk</Text>
        </View>

        <View className="flex-row gap-1">
          <Text className="text-primary font-bold">
            Rs 450 - Rs 550 per hour
          </Text>
        </View>
      </View>
    </View>
  );
};

const GroundComponent = () => {
  return (
    <View className="flex-row gap-3">
      <Image
        source={{
          uri: "https://1.bp.blogspot.com/-bBgD--rBiOg/Xi7oiO63yOI/AAAAAAAAHi4/MF7YQ_2y3nEArkdIDwOR1GCMvBxpCCeUQCEwYBhgL/w1200-h630-p-k-no-nu/footsal-ground-inside-kathmandu-valley-min.jpg",
        }}
        className="w-20 object-contain rounded-md border-2"
      />
      <View className="flex-col item-start">
        <View className="flex-row items-center gap-1">
          <Text className="font-bold text-md">Large Ground 1</Text>
          <Text className=" bg-gray-300 px-2 py-1 rounded-full text-xs text-grayText">
            5A Side
          </Text>
        </View>
        <View className="flex-row">
          <Text className="text-primary font-bold mb-2">
            Rs 450 - Rs 550 per hour
          </Text>
        </View>
        <BookNowButton label="Book this ground" onPress={() => {}} />
      </View>
    </View>
  );
};

const Location = () => {
  return (
    <View className="h-150">
      <MapView className="h-[100] w-full" />
    </View>
  );
};

const Reviews = () => {
  return (
    <View className="p-3">
      {Array.from({ length: 2 }, () => {
        return <Review />;
      })}
    </View>
  );
};
