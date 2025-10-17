import { getChores } from "@/api/chore";
import Block from "@/components/Block";
import { ChoreItem } from "@/components/chores";
import { Chores } from "@/types/chores";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [choresData, setChoresData] = useState<Chores | null>(null);

  const fetchData = async () => {
    const responseChores = await getChores();
    setChoresData(responseChores);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        {
          alignItems: "center",
          paddingBottom: 30,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Block style={{ backgroundColor: null, padding: 0, margin: 6 }}>
        <View style={styles_3.choresWrapper}>
          {choresData?.chores.map((item) => (
            <ChoreItem key={item.id} chore={item} />
          ))}
        </View>
      </Block>
    </ScrollView>
  );
}

const styles_3 = StyleSheet.create({
  choresWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    justifyContent: "space-between",
  },
});
