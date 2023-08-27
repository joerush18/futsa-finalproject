import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../assets/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Divider from "../components/ui/Divider";
import Sectionlayout from "../components/layout/Sectionlayout";
import BookNowButton from "../components/ui/BookNowButton";
import MapView, { Marker } from "react-native-maps";
import Review from "../components/Review";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useFutsalsStore } from "core";
import { RootStackParamList } from "../StackNavigator";
import { convertToAmPm } from "core";

type FutsalDetailScreenRouteProps = RouteProp<
  RootStackParamList,
  "Futsal-Detail"
>;

interface FutsalDetailScreenProps {
  route: FutsalDetailScreenRouteProps;
}

const FutsalDetailScreen = ({ route }: FutsalDetailScreenProps) => {
  const { futsals } = useFutsalsStore();
  const { futsalId } = route.params;
  const futsal = futsals.filter((f) => f.id === futsalId)[0];
  const {
    futsalName,
    ratings,
    address,
    price,
    coverPicture,
    description,
    profilePicture,
    Amenities,
    openTime,
    closeTime,
    groundSize,
    geoLocation,
  } = futsal;

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full h-48 object-fit">
          <Image
            source={{
              uri: coverPicture,
            }}
            className="w-full h-48 object-cover aspect-auto"
          />
          <View className="absolute top-0 right-0 left-0 bottom-0 bg-black opacity-50 rounded-md"></View>
        </View>
        <View className="p-4">
          <ProfileInfo
            name={futsalName}
            ratings={ratings}
            city={address.city}
            avatar={profilePicture}
            price={price.toString()}
            street={address.street}
          />
          <Text className="text-grayText mt-4 opacity-70">{description}</Text>
        </View>
        <Divider />
        <Sectionlayout title="Amenities">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2"
          >
            {Amenities.length ? (
              Amenities.map((amenity, index) => {
                return (
                  <Text
                    key={`amenity_${index}`}
                    className="px-3 py-2 bg-gray-300 rounded-md text-md text-grayText"
                  >
                    {amenity}
                  </Text>
                );
              })
            ) : (
              <Text>No Amenities added.</Text>
            )}
          </ScrollView>
        </Sectionlayout>
        <Divider />
        <View className="flex-row justify-between items-center px-4 my-3">
          <Text className="font-bold text-sm">Opening Time</Text>
          <Text className="text-white bg-grayText p-1 rounded-md">
            Opens {convertToAmPm(openTime)} to {convertToAmPm(closeTime)}
          </Text>
        </View>
        <Divider />
        <Sectionlayout title="Grounds">
          <GroundComponent
            groundSize={groundSize.toString()}
            price={price.toString()}
            futsalId={futsalId}
          />
        </Sectionlayout>
        <Divider />
        <Sectionlayout title="Location">
          <Location
            lat={geoLocation?.lat ? +geoLocation?.lat : 0}
            lng={geoLocation?.lng ? +geoLocation?.lng : 0}
          />
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

interface ProfileInfoProps {
  name: string;
  ratings: number;
  city: string;
  price?: string;
  street: string;
  avatar?: string;
}

const ProfileInfo = ({
  name,
  ratings,
  city,
  price,
  street,
  avatar,
}: ProfileInfoProps) => {
  return (
    <View className="flex-row gap-3">
      <Image
        source={{
          uri: avatar,
        }}
        className="w-20 object-contain rounded-md border-2"
      />
      <View className="flex-col item-start">
        <View className="flex-row items-center gap-1">
          <Text className="font-bold text-md">{name}</Text>
          <FontAwesome name="star" size={12} color={color.yellow} />
          <Text className="font-bold text-md">{ratings}</Text>
        </View>
        <View className="flex-row items-center gap-1 opacity-60">
          <MaterialCommunityIcons
            name="walk"
            size={12}
            color={color.grayText}
          />
          <Text className=" text-grayText">5 mins</Text>
          <Text className=" text-grayText">|{" " + city + " " + street} </Text>
        </View>

        <View className="flex-row gap-1">
          <Text className="text-primary font-bold">Rs {price} per hour</Text>
        </View>
      </View>
    </View>
  );
};

interface GroundComponentProps {
  groundSize: string;
  price: string;
  futsalId: string;
}

const GroundComponent = ({
  groundSize,
  price,
  futsalId,
}: GroundComponentProps) => {
  const navigator = useNavigation();
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
            {groundSize}A Side
          </Text>
        </View>
        <View className="flex-row">
          <Text className="text-primary font-bold mb-2">
            Rs {price} per hour
          </Text>
        </View>
        <BookNowButton
          label="Book this ground"
          onPress={() => {
            // @ts-ignore
            navigator.navigate("Booking" as never, {
              futsalId: futsalId,
            });
          }}
        />
      </View>
    </View>
  );
};

const Location = ({ lat, lng }: { lat?: number; lng?: number }) => {
  const initialRegion = {
    latitude: lat || 28.208218948316958,
    longitude: lng || 84.00158931591984,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <View className="h-150">
      <MapView className="h-[100] w-full" initialRegion={initialRegion}>
        <Marker
          coordinate={{
            latitude: lat ?? 0,
            longitude: lng ?? 0,
          }}
          title="Your Location"
          description="You are here"
        />
      </MapView>
    </View>
  );
};

const Reviews = () => {
  return (
    <View className="p-3">
      {Array.from({ length: 2 }, (_, index) => {
        return <Review key={`review_${index}`} />;
      })}
    </View>
  );
};
