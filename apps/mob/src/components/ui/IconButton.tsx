import { TouchableOpacity } from "react-native";
import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white shadow-md p-2 rounded-xl"
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
