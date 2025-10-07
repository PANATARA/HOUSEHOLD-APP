import { Chore, ChoreCompletionResponse } from "@/types/chores";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Avatar from "./avatar";

export function ChoreItem({ chore }: { chore: Chore }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles_1.choreCard}
      onPress={() =>
        router.push({
          pathname: "/modals/choreModal",
          params: {
            id: chore.id,
            name: chore.name,
            description: chore.description,
            icon: chore.icon,
            valuation: chore.valuation,
          },
        })
      }
    >
      <Text style={styles_1.choreIcon}>{chore.icon || "⏳"}</Text>
      <Text style={styles_1.choreText}>{chore.name || "Загрузка..."}</Text>
    </TouchableOpacity>
  );
}

const styles_1 = StyleSheet.create({
  choreCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "48%",
    // тень для легкой глубины
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  choreIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  choreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    flexShrink: 1,
  },
});

export function ChoreHistoryCard({ item }: { item: ChoreCompletionResponse }) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    weekday: "short",
    month: "short",
  };

  const date = new Date(item.completed_at).toLocaleDateString("timezone", options);

  return (
    <View style={styles_2.choreCard}>
      <Avatar size={50} url={undefined} is_pressable={false} />
      <TouchableOpacity
        style={{
          flexShrink: 1,
          marginLeft: 10,
        }}
        activeOpacity={0.9}
      >
        <Text style={styles_2.choreTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.chore.name}
        </Text>
        <Text style={styles_2.username}>
          {item.completed_by.name} {item.completed_by.surname}
        </Text>
        <Text style={styles_2.date}>{date}</Text>
        <Text style={styles_2.message}>{item.message}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      <View style={styles_2.iconContainer}>
        <Text style={styles_2.choreIcon}>{item.chore.icon}</Text>
      </View>
    </View>
  );
}

const styles_2 = StyleSheet.create({
  choreCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff", // белый фон
    // Тень
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: "#f0f0f0", // светло-серый
    justifyContent: "center",
    alignItems: "center",
  },

  choreIcon: {
    fontSize: 30, // иконка оставляем цветной
  },
  choreTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000", // черный текст
  },
  username: {
    color: "#555", // темно-серый
    fontSize: 14,
  },
  date: {
    color: "#888", // серый
    fontSize: 12,
  },
  message: {
    color: "#333", // чуть темнее серого
    fontSize: 14,
  },
});

export default function ConfirmationCard({
  itemId,
  chore_completion,
  onApprove,
  onCancel,
}: {
  itemId: string;
  chore_completion: ChoreCompletionResponse;
  onApprove: (id: string) => Promise<void>;
  onCancel: (id: string) => Promise<void>;
}) {
  // отрисовка кнопки справа (Reject)
  const renderRightActions = () => (
    <RectButton
      style={[styles_3.actionButton, { backgroundColor: "#FF3B30" }]}
      onPress={() => onCancel(itemId)}
    >
      <Text style={styles_3.actionText}>Reject</Text>
    </RectButton>
  );

  // отрисовка кнопки слева (Approve)
  const renderLeftActions = () => (
    <RectButton
      style={[styles_3.actionButton, { backgroundColor: "#4CAF50" }]}
      onPress={() => onApprove(itemId)}
    >
      <Text style={styles_3.actionText}>Approve</Text>
    </RectButton>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      overshootFriction={8}
    >
      <ChoreHistoryCard item={chore_completion} />
    </Swipeable>
  );
}

const styles_3 = StyleSheet.create({
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
