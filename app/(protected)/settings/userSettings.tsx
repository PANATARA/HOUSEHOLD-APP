import { getMeProfile, updateMeProfile } from "@/api/user";
import Avatar from "@/components/avatar";
import { UserProfile } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const [showPicker, setShowPicker] = useState(false);

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      const response = await getMeProfile();
      setUserData(response);
      setName(response.user.name || "");
      setSurname(response.user.surname || "");
      setUsername(response.user.username || "");
      setBirthday(null);
    } catch (e) {
      console.error("Ошибка загрузки профиля:", e);
    }
  };

  const handleSave = async () => {
    await updateMeProfile({
      username: username,
      name: name,
      surname: surname,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.avatarSection}>
        <TouchableOpacity>
          <Avatar
            size={120}
            object_id={userData?.user.id}
            object_type="user"
            avatar_version={userData?.user.avatar_version}
            is_pressable={true}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Имя</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />

        <Text style={styles.label}>Фамилия</Text>
        <TextInput value={surname} onChangeText={setSurname} style={styles.input} />

        <Text style={styles.label}>Имя пользователя</Text>
        <TextInput value={username} onChangeText={setUsername} style={styles.input} />

        <Text style={styles.label}>Дата рождения</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateInput}>
          <Text style={{ fontSize: 16 }}>
            {birthday ? birthday.toLocaleDateString("ru-RU") : "Не указано"}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#777" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={birthday || new Date(2000, 0, 1)}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, date) => {
              setShowPicker(Platform.OS === "ios");
              if (date) setBirthday(date);
            }}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={async () => {
          await handleSave();
        }}
      >
        <Text style={styles.saveText}>Сохранить</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  avatarSection: { alignItems: "center", marginVertical: 20 },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0088cc",
    borderRadius: 12,
    padding: 4,
  },
  form: { paddingHorizontal: 20 },
  label: {
    color: "#666",
    fontSize: 13,
    marginTop: 18,
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 6,
    fontSize: 16,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: "#0088cc",
    margin: 20,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
