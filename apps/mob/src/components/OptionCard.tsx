import { Text, TouchableOpacity, View } from "react-native";
import Card from "./ui/Card";
import { Entypo } from "@expo/vector-icons";

interface OptionsCardProps {
  children?: React.ReactNode;
  label: string;
}

const OptionsCard: React.FC<OptionsCardProps> = ({ children, label }) => {
  return (
    <TouchableOpacity className="w-full">
      <Card>
        <View className="flex-row items-center w-full justify-between">
          <View className="flex-row items-center gap-4">
            {children}
            <Text className="font-bold">{label}</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OptionsCard;
