import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextProps, TouchableOpacity } from "react-native";

export type PressableTextProps = TextProps & {
  to: string; // экран, на который нужно перейти
};

export function PressableText({ style, to, ...rest }: PressableTextProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(to as never);
      }}
    >
      <Text style={[styles.link, style]} {...rest} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    lineHeight: 30,
    fontSize: 17,
    color: "#007AFF",
  },
});
