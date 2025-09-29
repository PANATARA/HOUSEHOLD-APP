import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";

type AvatarProps = {
  size: number;
  url: string | undefined;
  is_pressable: boolean;
  onPress?: () => void;
  style?: object;
};

export default function Avatar({
  size,
  url,
  is_pressable,
  onPress,
  style,
}: AvatarProps) {
  const defaultAvatar = require("@/assets/images/splash-icon.png");
  const imageSource = url ? { uri: url } : defaultAvatar;
  return (
    <TouchableOpacity onPress={onPress} disabled={!is_pressable}>
      <Image
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          style,
        ]}
        source={imageSource}
        autoplay
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
