import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getMeProfile } from "@/api/user";
import Block from "@/components/Block";
import ProfileCard from "@/components/userProfile";
import { UserProfile } from "@/types/user";

function SettingsCard() {
  const router = useRouter();
  const settingsItems: {
    label: string;
    icon: React.ReactNode;
    bgColor: string;
    route: string;
  }[] = [
    {
      label: "Family settings",
      icon: <Ionicons name="people" color="white" style={stylesSettings.icon} />,
      bgColor: "#4D9DE0",
      route: "settings/familySettings",
    },
    {
      label: "Account settings",
      icon: (
        <MaterialIcons
          name="manage-accounts"
          color="white"
          style={stylesSettings.icon}
        />
      ),
      bgColor: "#FFA630",
      route: "/",
    },
    {
      label: "Notifications",
      icon: <Ionicons name="notifications" color="white" style={stylesSettings.icon} />,
      bgColor: "#E15554",
      route: "/",
    },
    {
      label: "Language",
      icon: <Ionicons name="language" color="white" style={stylesSettings.icon} />,
      bgColor: "#7768AE",
      route: "/",
    },
    {
      label: "App Theme",
      icon: <Ionicons name="moon" color="#fff" style={stylesSettings.icon} />,
      bgColor: "#364156",
      route: "/",
    },
    {
      label: "Household Premium",
      icon: <Ionicons name="star" color="white" style={stylesSettings.icon} />,
      bgColor: "#FFD23F",
      route: "/",
    },
    {
      label: "About us",
      icon: <Ionicons name="help-circle" color="white" style={stylesSettings.icon} />,
      bgColor: "#1F2A44",
      route: "/",
    },
  ];

  return (
    <Block>
      {settingsItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[stylesSettings.button]}
          activeOpacity={0.7}
          onPress={() => router.navigate(item.route as never)}
        >
          <View style={stylesSettings.content}>
            <View
              style={[stylesSettings.iconWrapper, { backgroundColor: item.bgColor }]}
            >
              {item.icon}
            </View>
            <Text style={stylesSettings.buttonText}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </Block>
  );
}

export default function ProfileSettingsScreen() {
  const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const response = await getMeProfile();
        setUserProfileData(response);
      };
      fetchData();
    }, []),
  );
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ProfileCard
        name={userProfileData?.user.name}
        surname={userProfileData?.user?.surname}
        username={userProfileData?.user?.username}
        avatar_url={undefined}
      />
      <SettingsCard />
    </SafeAreaView>
  );
}

const stylesSettings = StyleSheet.create({
  button: {
    height: 45,
    width: "100%",
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#969696ff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#f4f3fe",
    fontWeight: 600,
  },
  icon: {
    fontSize: 20,
  },
  iconWrapper: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
