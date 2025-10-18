import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { createChoreCompletion, deleteChore, getChoresCompletion } from "@/api/chore";
import Block from "@/components/Block";
import { ChoreHistoryCard } from "@/components/chores";
import { ChoreCompletionResponse } from "@/types/chores";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function ChoreModalScreen() {
  const router = useRouter();
  const { id, name, description, icon, valuation } = useLocalSearchParams<{
    id: string;
    name: string;
    description?: string;
    icon: string;
    valuation: string;
  }>();

  const [text, setText] = useState("");

  const [choresHistoryData, setChoresHistoryData] = useState<
    ChoreCompletionResponse[] | null
  >(null);

  const handleSubmit = async () => {
    const response = await createChoreCompletion(id, text);
    if (response) {
      setText("");
      router.back();
    }
  };

  const handleCancel = async () => {
    setText("");
    router.back();
  };

  const handleDelete = async () => {
    Alert.alert("Удалить задание?", "Это действие нельзя отменить.", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Удалить",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteChore(id);
            router.back();
          } catch (err) {
            console.error(err);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchChore = async () => {
      if (!id) return;
      const responseChoresHistory = await getChoresCompletion({
        status: "approved",
        chore_id: id,
        offset: 0,
        limit: 1,
      });
      setChoresHistoryData(responseChoresHistory);
    };
    fetchChore();
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Выполнить задание",
          presentation: "modal",
          headerRight: () => (
            <TouchableOpacity onPress={handleDelete}>
              <MaterialIcons
                name="delete-forever"
                style={{ fontSize: 25, color: "#ff5757ff" }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#f1f1f1" }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 100,
              alignItems: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            <Block style={styles_1.profileCard}>
              <Text style={styles_1.profileIcon}>{icon}</Text>
              <Text style={styles_1.profileName}>{name}</Text>
              {description && (
                <Text style={styles_1.profileDescription}>{description}</Text>
              )}
              <View style={styles_1.profileValuationWrapper}>
                <Text style={styles_1.profileValuation}>
                  {valuation ? `${valuation} XP` : "—"}
                </Text>
              </View>
              <Text style={styles_1.profileLastCompleteText}>Последнее выполнение</Text>
              {choresHistoryData?.map((item) => (
                <ChoreHistoryCard key={item.id} item={item} />
              ))}
            </Block>

            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles_2.input}
                placeholder="Введите комментарий..."
                value={text}
                onChangeText={setText}
                multiline
              />
              <View style={styles_2.buttonsWrapper}>
                <View style={styles_2.button}>
                  <Button title="Отменить" onPress={handleCancel} color="#FF3B30" />
                </View>
                <View style={styles_2.button}>
                  <Button title="Выполнить" onPress={handleSubmit} color="#4CAF50" />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles_1 = StyleSheet.create({
  profileCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    margin: 12,
    borderRadius: 16,
    alignItems: "center",
    // Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  profileIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  profileDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  profileValuationWrapper: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  profileValuation: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2a9d8f",
  },
  profileLastCompleteText: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: 12,
    marginBottom: 6,
  },
});

const styles_2 = StyleSheet.create({
  input: {
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    padding: 15,
    minWidth: "100%",
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
