import { uploadFamilyAvatar } from "@/api/family";
import { uploadUserAvatar } from "@/api/user";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function UploadAvatarAsync(whose: "user" | "family") {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const file = {
      uri: asset.uri,
      name: "avatar.jpg",
      type: asset.mimeType || "image/jpeg",
    };

    if (whose === "user") {
      await uploadUserAvatar({ file });
    } else {
      await uploadFamilyAvatar({ file });
    }

    Alert.alert("Аватар обновлён");
  } catch (error: any) {
    console.error("Ошибка загрузки аватара:", error);

    if (error?.response?.status === 400) {
      Alert.alert("Слишком большой файл (до 5 МБ)");
    } else {
      Alert.alert("Не удалось загрузить аватар");
    }
  }
}
