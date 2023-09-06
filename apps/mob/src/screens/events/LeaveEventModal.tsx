import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Card from "../../components/ui/Card";

export const LeaveEventModal = ({
  isVisible,
  setIsVisible,
  handleConfirm,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: () => void;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
    >
      <Card>
        <View className="flex-col">
          <Text className="text-md font-bold ">
            Are you sure you want to leave this event ?
          </Text>
          <Text>Leaving this event will remove your team from the event.</Text>
        </View>
        <View className="flex-row gap-4 mt-1 mb-2 justify-center">
          <TouchableOpacity
            className="px-4  py-2 bg-primary rounded-md"
            onPress={() => {
              handleConfirm();
              setIsVisible(false);
            }}
          >
            <Text className="font-bold text-white">Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 bg-rose-600 rounded-md"
            onPress={() => setIsVisible(false)}
          >
            <Text className="font-bold text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </Modal>
  );
};
