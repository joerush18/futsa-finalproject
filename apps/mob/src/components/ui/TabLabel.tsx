import { Text } from "react-native";
import color from "../../assets/colors";

interface TabLabelProps {
  label?: string;
  focused?: boolean;
}
const TabLabel: React.FC<TabLabelProps> = ({ focused, label }) => {
  return (
    <Text
      style={{
        color: focused ? color.primary : color.grayLight,
        fontSize: 10,
      }}
    >
      {label}
    </Text>
  );
};
export default TabLabel;
