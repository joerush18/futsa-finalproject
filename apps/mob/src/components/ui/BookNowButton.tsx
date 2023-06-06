import { Pressable, Text } from "react-native";
import color from "../../assets/colors";

interface BookNowButtonProps {
  onPress: () => void;
  label?: string;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({
  onPress,
  label = "Book now",
}) => {
  return (
    <Pressable className="bg-primary py-2 w-full rounded-md" onPress={onPress}>
      <Text className="text-center text-white font-bold">{label}</Text>
    </Pressable>
  );
};

export default BookNowButton;
