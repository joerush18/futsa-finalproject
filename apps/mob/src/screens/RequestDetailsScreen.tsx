import * as React from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../StackNavigator";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import Modal from "react-native-modal";
import { useEffect, useLayoutEffect } from "react";
import color from "../assets/colors";
import {
  IBids,
  REQUEST_STATUS,
  timeAgo,
  useBidsStore,
  useRequestStore,
  useUpdateBids,
  useUpdateRequest,
} from "core";
import TextLabel from "../components/ui/TextLabel";
import IconButton from "../components/ui/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBids from "../hooks/useBids";
import Loading from "../components/ui/Loading";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Toast } from "react-native-toast-message/lib/src/Toast";

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
          bids.map((bid) => (
            <BidCard
              key={bid.id}
              bid={bid}
              handleClick={(bid) => {
                setIsVisible(true);
                setSelectedBid(bid);
              }}
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

const BidCard = ({
  bid,
  handleClick,
}: {
  bid: IBids;
  handleClick?: (bid: IBids) => void;
}) => {
  const {
    createdBy,
    createdAt,
    message,
    budget,
    venue,
    freebies,
    updatedAt,
    isSelected,
  } = bid;

  return (
    <View className="bg-primaryLight/30 rounded-md p-4 border-[1px] border-gray-300 relative mt-3">
      {/* Status */}
      {isSelected ? (
        <MaterialCommunityIcons
          name="check-circle"
          size={24}
          color="green"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        />
      ) : null}
      <View className="flex-row space-x-3 items-center">
        <Avatar label={createdBy?.name.slice(0, 2)} size={48} />
        <View>
          <Text className="text-gray-700 text-md font-bold">
            {createdBy?.name}
          </Text>
          <Text className="text-gray-500 text-md">{createdBy?.email}</Text>
        </View>
      </View>
      <Text className="text-gray-700">{message}</Text>
      {/* icons */}
      <View className="flex-row items-center justify-between mt-2">
        <Text className="font-bold text-lg">RS. {budget}</Text>
        <View className="flex-row items-center space-x-1">
          <MaterialCommunityIcons name="map-marker" size={16} />
          <Text className="text-md font-bold text-gray-700">
            {/* @ts-ignore */}
            {venue?.value?.description.split(",")[0]}
          </Text>
        </View>
      </View>
      {/* Freebies */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {freebies?.length
          ? freebies.map((free) => {
              return (
                <Text className="bg-primary px-3 py-1 rounded-md mt-2 mr-3 font-bold text-white">
                  {free}
                </Text>
              );
            })
          : null}
      </ScrollView>
      <Text className="text-xs mt-3 text-gray-600">
        {updatedAt
          ? `Edited : ${timeAgo(updatedAt)}`
          : `Posted on : ${timeAgo(createdAt)}`}
      </Text>
      <Button
        className="py-3 mt-2 bg-transparent border-[1px] border-primary"
        onPress={() => {
          handleClick?.(bid);
        }}
      >
        <Text className="text-center text-primary">Accept Bid</Text>
      </Button>
    </View>
  );
};

const ConfirmModal = ({
  isVisible,
  setIsVisible,
  handleAcceptBid,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAcceptBid: () => void;
}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
      >
        <Card>
          <Text className="font-bold text-xl">Confirm the bidding.</Text>
          <Text className="text-sm text-left">
            Are you sure you want to accept this bid. You can't undo this
            action.
          </Text>
          <View className="flex-row space-x-4 items-center">
            <Button
              className="bg-primary mt-2 basis-40"
              onPress={handleAcceptBid}
            >
              <Text className="text-center text-white">Accept</Text>
            </Button>
            <Button
              className="bg-rose-400 mt-2 basis-40"
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Text className="text-center text-white">Cancel</Text>
            </Button>
          </View>
        </Card>
      </Modal>
    </View>
  );
};
