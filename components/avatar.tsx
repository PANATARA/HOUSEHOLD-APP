import { getAccessToken } from "@/core/secureStorage";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type AvatarProps = {
  size: number;
  object_id?: string | null;
  object_type: "family" | "user";
  avatar_version?: number;
  is_pressable: boolean;
  onPress?: () => void;
  style?: object;
};

function getAvatarUrl(
  type: "user" | "family",
  id?: string | null,
  version?: number,
): string | null {
  const base = "http://192.168.0.90:8000/api";

  if (type === "user" && id) {
    const url = `${base}/users/${id}/avatar`;
    return version ? `${url}?v=${version}` : url;
  }

  if (type === "family") {
    const url = `${base}/families/avatar`;
    return version ? `${url}?v=${version}` : url;
  }

  return null;
}

export default function Avatar({
  size,
  object_id,
  object_type,
  avatar_version,
  is_pressable,
  onPress,
  style,
}: AvatarProps) {
  const [token, setToken] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const url = getAvatarUrl(object_type, object_id, avatar_version);
      const t = await getAccessToken();

      if (isMounted) {
        setImageUrl(url);
        setToken(t);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [object_id, object_type, avatar_version]);

  return (
    <TouchableOpacity onPress={onPress} disabled={!is_pressable}>
      <Image
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
        source={
          imageUrl
            ? { uri: imageUrl, headers: { Authorization: `Bearer ${token}` } }
            : require("@/assets/images/icon.png") // запасной вариант
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 1,
    borderColor: "#d6d6d6",
    backgroundColor: "#414141",
  },
});
