import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Card from "./Card";
import { AntDesign } from "@expo/vector-icons";
import { createUniqueId } from "core";

interface ModalComponentProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComponent = ({ isVisible, setIsVisible }: ModalComponentProps) => {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View className="flex items-center justify-center text-white">
          <Card>
            <View className="flex items-center justify-center p-4">
              <AntDesign name="checkcircle" size={42} color="green" />
              <Text className="font-bold text-center mt-2">
                #{createUniqueId()}
              </Text>
              <Text className="font-bold text-center">
                Your booking has been sent successfully.
              </Text>
              <Text className="text-center font-xs opacity-60">
                Someone from the futsal will accept your request and will
                contact you soon.
              </Text>
              <View className="flex-row gap-4 mt-1">
                <TouchableOpacity className="px-4  py-2 bg-violet-500 rounded-md">
                  <Text className="font-bold text-white">
                    Proceed to Payment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 bg-rose-600 rounded-md"
                  onPress={() => setIsVisible(false)}
                >
                  <Text className="font-bold text-white">Pay Later</Text>
                </TouchableOpacity>
              </View>
              <Text className="mt-2 text-xs opacity-60">
                Your booking might be cancelled on payment delay.
              </Text>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
