import { getChoresCompletion } from "@/api/chore";
import { ChoreHistoryCard } from "@/components/chores";
import { ChoreCompletionResponse } from "@/types/chores";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

const PAGE_SIZE = 15;

export default function HomeScreen() {
  const [choresHistoryData, setChoresHistoryData] = useState<ChoreCompletionResponse[]>(
    [],
  );
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getChoresCompletion({
        status: "approved",
        offset,
        limit: PAGE_SIZE,
      });

      if (response.length > 0) {
        setChoresHistoryData((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const filtered = response.filter((item) => !existingIds.has(item.id));
          return [...prev, ...filtered];
        });

        setOffset((prev) => prev + response.length);

        if (response.length < PAGE_SIZE) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  useFocusEffect(
    useCallback(() => {
      setOffset(0);
      setHasMore(true);
      setChoresHistoryData([]);

      fetchData();
    }, []),
  );

  const renderItem = ({ item }: { item: ChoreCompletionResponse }) => (
    <ChoreHistoryCard item={item} />
  );

  return (
    <FlatList
      data={choresHistoryData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.choresHistoryWrapper}
      onEndReached={fetchData}
      onEndReachedThreshold={0}
      ListFooterComponent={
        loading ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  choresHistoryWrapper: {
    paddingBottom: 10,
    gap: 8,
  },
});
