import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { generateFamilyInviteToken } from "@/api/family";
import Block from "@/components/Block";
import QRCode from "react-native-qrcode-svg";

export default function SettingsFamilyInviteCard() {
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

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
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
