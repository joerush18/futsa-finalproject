import * as React from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../StackNavigator";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useEffect, useLayoutEffect } from "react";
import color from "../../assets/colors";
import {
  IBids,
  REQUEST_STATUS,
  timeAgo,
  useBidsStore,
  useRequestStore,
  useUpdateBids,
  useUpdateRequest,
} from "core";
import TextLabel from "../../components/ui/TextLabel";
import IconButton from "../../components/ui/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBids from "../../hooks/useBids";
import Loading from "../../components/ui/Loading";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BidCard } from "./BidCard";
import { ConfirmModal } from "./ConfirmModal";

type RequestDetailsScreenRouteProps = RouteProp<
  RootStackParamList,
  "Request-Detail"
>;

interface RequestDetailsScreenProps {
  route: RequestDetailsScreenRouteProps;
}

const RequestDetailsScreen: React.FC<RequestDetailsScreenProps> = ({
  route,
}) => {
  const { requestId } = route.params;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Request details",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
        color: color.white,
      },
    });
  }, []);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [selectedBid, setSelectedBid] = React.useState<IBids | null>(null);

  const { requests } = useRequestStore();
  const request = requests.find((r) => r.id === requestId);
  const { bids, isFetchingBids, refreshing, onRefresh, refetch } =
    useBids(requestId);

  const { mutate: updateBid, isLoading: isUpdatingBid } = useUpdateBids();
  const { mutate: updateRequest, isLoading: isUpdatingRequest } =
    useUpdateRequest();

  const { updateBids: updateBidLocal } = useBidsStore();

  const { updateRequest: updateRequestLocal } = useRequestStore();

  const handleAcceptBid = (bid: IBids) => {
    const updatedBid = {
      id: bid.id,
      isSelected: true,
      updatedAt: +new Date(),
    };
    updateBidLocal({ ...updatedBid });
    updateBid(
      { ...updatedBid },
      {
        onSuccess: () => {
          updateRequest(
            { id: request?.id, status: REQUEST_STATUS.ACCEPTED },
            {
              onSuccess: () => {
                updateRequestLocal({
                  id: request?.id,
                  status: REQUEST_STATUS.ACCEPTED,
                });
              },
            }
          );
          Toast.show({
            type: "success",
            text1: "Bid accepted successfully",
          });
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
        },
      }
    );
  };

  useEffect(() => {
    refetch();
  }, [request?.id]);
  if (isFetchingBids || isUpdatingBid || isUpdatingRequest) return <Loading />;

  if (!request)
    return (
      <View>
        <Text>Request not found</Text>
      </View>
    );
  return (
    <ScrollView
      className="py-3"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="mx-4">
        <View className="flex-row justify-between items-center w-full">
          <Text
            className={`font-bold mb-2 px-2 py-1 rounded-lg min-w-[120px] text-center text-white ${
              request.status === REQUEST_STATUS.ACCEPTED
                ? "bg-green-700"
                : "bg-orange-500"
            }`}
          >
            {request.status}
          </Text>
          {request.status === REQUEST_STATUS.ACTIVE ? (
            <IconButton>
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color={color.primary}
              />
            </IconButton>
          ) : null}
        </View>
        <Text className="text-gray-500 text-md">
          {timeAgo(request.createdAt)}
        </Text>
        <Text className="font-bold text-lg">{request.title}</Text>
        <Text>{request.description}</Text>
      </View>

      <View className="flex-row mx-4 mt-4">
        <TextLabel label="Start Date" value={request.startDate} />
        <TextLabel label="End Date" value={request.endDate} />
      </View>
      <View className="flex-row mx-4">
        <TextLabel label="Budget" value={request.budget} />
        <TextLabel label="Location" value={request.location} />
        <TextLabel label="deadline" value={request.deadline} />
      </View>
      {/* Bids */}
      <View className="mx-4 mt-4 pb-6">
        <Text className="font-bold text-lg mb-2">Bids</Text>
        {bids.length ? (
          bids.map((bid, index) => (
            <BidCard
              key={`${index}_bid`}
              bid={bid}
              handleClick={(bid) => {
                setIsVisible(true);
                setSelectedBid(bid);
              }}
              status={request.status}
            />
          ))
        ) : (
          <Text>No bids yet.</Text>
        )}
      </View>
      <ConfirmModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleAcceptBid={() => {
          setIsVisible(false);
          handleAcceptBid(selectedBid as IBids);
        }}
      />
    </ScrollView>
  );
};

export default RequestDetailsScreen;
