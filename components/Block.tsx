import { ReactNode } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type BlockProps = {
  children: ReactNode;
  style?: object;
  blockTitle?: string;
};

export default function DefaultBlock({ children, style, blockTitle }: BlockProps) {
  return (
    <View style={[styles.BlockContainer, { backgroundColor: "#ffffffff" }, style]}>
      {blockTitle && <Text style={styles.BlockTitle}>{blockTitle}</Text>}
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  BlockContainer: {
    padding: 15,
    borderRadius: 18,
    margin: 6,
    width: Dimensions.get("window").width - 24,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  BlockTitle: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 10,
    color: "black",
  },
});
