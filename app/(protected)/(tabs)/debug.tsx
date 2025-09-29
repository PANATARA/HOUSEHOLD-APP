import { getMeProfile } from "@/api/user";
import { deleteAllTokens } from "@/core/secureStorage";
import { UserProfile } from "@/types/user";
import { AuthContext } from "@/utils/authContext";
import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const authContext = useContext(AuthContext);

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        const data = await getMeProfile();
        setProfile(data);
      };
      fetchUser();
    }, []),
  );

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text>
          USER: {profile?.user.name} {profile?.user.username}
        </Text>
      </View>

      <Button
        title="Delete Tokens"
        onPress={async () => {
          await deleteAllTokens();
        }}
      />

      <View style={{ height: 10 }} />

      <Button title="Logout" onPress={authContext.logOut} />
    </SafeAreaView>
  );
}
