import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";

interface IconButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...props}) => {
  return (
    <TouchableOpacity
      className="bg-white border-gray-400 border-[0.5px] p-3 rounded-xl"
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
