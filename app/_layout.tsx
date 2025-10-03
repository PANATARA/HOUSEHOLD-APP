import { AuthProvider } from "@/utils/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  console.log("Привет!");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
        </Stack>
        {/* <DebugButton /> */}
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
