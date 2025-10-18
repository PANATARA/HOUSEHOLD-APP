import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { generateFamilyInviteToken, getMeFamily } from "@/api/family";
import Avatar from "@/components/avatar";
import Block from "@/components/Block";
import { FamilyMembersResponse } from "@/types/family";
import { UploadAvatarAsync } from "@/utils/uploadAvatar";
import { useFocusEffect } from "expo-router";
import QRCode from "react-native-qrcode-svg";

export default function SettingsFamilyInviteCard() {
  const [familyData, setFamilyData] = useState<FamilyMembersResponse | null>(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const [qrCodeBase64, setQrCodeBase64] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQrCode = async () => {
    setLoading(true);
    const qrCode = await generateFamilyInviteToken({
      should_confirm_chore_completion: false,
    });
    setQrCodeBase64(qrCode?.invite_token ?? "");
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const response = await getMeFamily();
      setFamilyData(response);
      setName(response.family.name || "");
      setIcon(response.family.icon || "");
    } catch (e) {
      console.error("Ошибка загрузки профиля семьи:", e);
    }
  };

  const handleSave = async () => {};

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <Block>
        <View style={styles_2.avatarSection}>
          <TouchableOpacity>
            <Avatar
              size={120}
              object_id={familyData?.family.id}
              object_type="family"
              avatar_version={familyData?.family.avatar_version}
              is_pressable={true}
              onPress={async () => UploadAvatarAsync("family")}
            />
            <View style={styles_2.cameraIcon}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles_2.form}>
          <Text style={styles_2.label}>Название Семьи</Text>
          <TextInput value={name} onChangeText={setName} style={styles_2.input} />

          <Text style={styles_2.label}>Иконка</Text>
          <TextInput value={icon} onChangeText={setIcon} style={styles_2.input} />
        </View>

        <TouchableOpacity
          style={styles_2.saveButton}
          onPress={async () => {
            await handleSave();
          }}
        >
          <Text style={styles_2.saveText}>Сохранить</Text>
        </TouchableOpacity>
      </Block>
      <Block style={{ alignItems: "center" }}>
        {!qrCodeBase64 && !loading ? (
          <AntDesign name="qrcode" size={164} color="#e1e2e3" />
        ) : loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text>Загрузка</Text>
          </View>
        ) : (
          qrCodeBase64 && (
            <View style={styles.qrCodeWrapper}>
              <QRCode value={qrCodeBase64} size={300} color="#5a78a8ff" />
            </View>
          )
        )}
        <Button title="Сгенерировать" onPress={fetchQrCode} />
        <Text style={styles.helpText}>
          Сгенерируй QR-код и покажи его члену своей семьи, чтобы он смог присоединиться
          к вашей семье в приложении.
        </Text>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  qrCodeWrapper: {
    marginTop: 20,
  },
  loadingWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  helpText: {
    color: "#868686ff",
    fontSize: 12,
  },
});

const styles_2 = StyleSheet.create({
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
