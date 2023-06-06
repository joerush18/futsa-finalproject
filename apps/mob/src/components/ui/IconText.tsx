import { View, Text } from "react-native";

interface IconTextProps {
  icon: React.ReactNode;
  label: string;
}
const IconText: React.FC<IconTextProps> = ({ icon, label }) => {
  return (
    <View className="items-center gap-2 mr-10 opacity-30 text-grayText">
      {icon}
      <Text className="">{label}</Text>
    </View>
  );
};

export default IconText;
