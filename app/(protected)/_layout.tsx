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
        name="modals/modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
      <Stack.Screen
        name="modals/newmodal"
        options={{ presentation: "modal", title: "Modal" }}
      />
      <Stack.Screen
        name="modals/choreModal"
        options={{ presentation: "modal", title: "Complete chore" }}
      />
    </Stack>
  );
}
