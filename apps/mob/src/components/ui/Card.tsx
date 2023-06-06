import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    marginTop: 10,
    position: "relative",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

interface CardProps {
  children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={[styles.card, styles.shadowProp]}>{children}</View>;
};

export default Card;
