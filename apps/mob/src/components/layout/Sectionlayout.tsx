import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "../../assets/colors";

interface SectionlayoutProps {
  children?: React.ReactNode;
  title: string;
  buttonText?: string;
}

const Sectionlayout: React.FC<SectionlayoutProps> = ({
  children,
  title,
  buttonText,
}) => {
  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <Pressable>
          <Text
            style={{
              color: color.primary,
            }}
          >
            {buttonText}
          </Text>
        </Pressable>
      </View>
      {children}
    </View>
  );
};

export default Sectionlayout;
