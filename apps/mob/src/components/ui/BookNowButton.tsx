import { Pressable, Text,PressableProps } from "react-native";
import color from "../../assets/colors";

interface BookNowButtonProps extends PressableProps {
  label?: string;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({
  label = "Book now",
  ...props
}) => {
  return (
    <Pressable className="bg-primary py-2 w-full rounded-md" {...props}>
      <Text className="text-center text-white font-bold">{label}</Text>
    </Pressable>
  );
};

export default BookNowButton;
