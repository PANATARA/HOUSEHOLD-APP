import { useContext, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { debugAuth } from "@/api/auth";
import { AuthContext } from "@/utils/authContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
  };

  const DEBUGLogin = async () => {
    await debugAuth(email);
    authContext.logIn(); // обязательно вызов через скобки
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Logo */}
      <View style={styles.logoBlock}>
        <Text style={{ color: "white", fontSize: 24 }}>LOGO</Text>
      </View>

      {/* Email Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.emailBlock}
      >
        <TextInput
          style={styles.emailInput}
          placeholder="Enter your email"
          placeholderTextColor="#9E9E9E"
          value={email}
          onChangeText={setEmail}
        />
      </KeyboardAvoidingView>

      {/* Buttons */}
      <View style={styles.buttonsBlock}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <Button title="DEBUG LOGIN" onPress={DEBUGLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#424242",
    paddingLeft: 50,
    paddingRight: 50,
  },

  logoBlock: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  emailBlock: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },

  buttonsBlock: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 40,
  },

  emailInput: {
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    padding: 15,
  },

  button: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
