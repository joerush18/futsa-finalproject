import * as React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export const ConfirmModal = ({
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
