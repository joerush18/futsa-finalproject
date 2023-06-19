import { Pressable, Text, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  label?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label = "Book now",
  children,
  ...props
}) => {
  return (
    <Pressable className="bg-primary py-2 w-full rounded-md" {...props}>
      {children}
    </Pressable>
  );
};

export default Button;
