import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Block from "./Block";
import Avatar from "./avatar";

type ProfileCardProps = {
  id: string;
  name?: string;
  surname?: string;
  username?: string;
  avatar_version?: number;
};

export default function ProfileCard({
  id,
  name,
  surname,
  username,
  avatar_version,
}: ProfileCardProps) {
  return (
    <Block style={{ alignItems: "center" }}>
      <View>
        <Avatar
          size={120}
          object_id={id}
          object_type="user"
          avatar_version={avatar_version}
          is_pressable={false}
        />
      </View>
      <View style={styles.userInfoView}>
        <Text style={styles.userName}>
          {name} {surname}
        </Text>
        <Text style={styles.userUsername}>@{username}</Text>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  userInfoView: {
    alignItems: "center",
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: 600,
  },
  userUsername: {
    color: "white",
    fontSize: 14,
    fontWeight: 500,
  },
});
