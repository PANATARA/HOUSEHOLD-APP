import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export const unstable_settings = {
  initialRouteName: "(tabs)", // anchor
};

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/familySettings"
        options={{
          headerShown: true,
          title: "Семья",
          headerBackTitle: "Настройки",
        }}
      />
      <Stack.Screen
        name="settings/userSettings"
        options={{
          headerShown: true,
          title: "Настройки аккаунта",
          headerBackTitle: "Настройки",
        }}
      />
      <Stack.Screen
        name="modals/choreModal"
        options={{ presentation: "modal", title: "Complete chore" }}
      />
      <Stack.Screen
        name="main/allChores"
        options={{
          headerShown: true,
          title: "Все домашние дела",
          headerBackTitle: "назад",
        }}
      />
      <Stack.Screen
        name="main/allCompletions"
        options={{
          headerShown: true,
          title: "Истрия выполнений",
          headerBackTitle: "назад",
        }}
      />
    </Stack>
  );
}
