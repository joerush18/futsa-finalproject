import { Text, View } from "react-native";

const TextLabel = ({ label, value }: { label: string; value: string }) => {
  return (
    <View className="border-[1px] border-gray-300 rounded-md px-4 py-1 bg-gray-200 mb-3 mr-2">
      <Text className=" text-sm text-gray-400 capitalize">{label}</Text>
      <Text className=" text-sm text-primary font-bold capitalize">
        {value}
      </Text>
    </View>
  );
};
export default TextLabel;
