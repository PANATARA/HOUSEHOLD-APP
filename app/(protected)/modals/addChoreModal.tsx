import { createChore } from "@/api/chore";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function CreateChoreScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [emoji, setEmoji] = useState("😀");

  const handleCreate = async () => {
    const rewardNumber = Number(reward) || 0;
    const response = await createChore(name, description, emoji, rewardNumber);
    Alert.alert("✅ Задача создана!");
    setName("");
    setDescription("");
    setReward("");
    setEmoji("");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          placeholder="Иконка"
          style={styles.input}
          value={emoji}
          onChangeText={setEmoji}
        />

        <TextInput
          placeholder="Имя"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Описание"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          placeholder="Вознаграждение"
          style={styles.input}
          keyboardType="numeric"
          value={reward}
          onChangeText={setReward}
        />

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Создать</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 45,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#2db553",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
