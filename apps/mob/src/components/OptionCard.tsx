import { Text, TouchableOpacity, View } from "react-native";
import Card from "./ui/Card";
import { Entypo } from "@expo/vector-icons";

interface OptionsCardProps {
  children?: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const OptionsCard: React.FC<OptionsCardProps> = ({
  children,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity className="w-full" onPress={onPress}>
      <Card>
        <View className="flex-row items-center w-full justify-between">
          <View className="flex-row items-center gap-4">
            {children}
            <Text className="font-bold text-grayText opacity-70">{label}</Text>
          </View>
          <Entypo
            name="chevron-right"
            size={24}
            color="black"
            className="opacity-70"
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OptionsCard;
