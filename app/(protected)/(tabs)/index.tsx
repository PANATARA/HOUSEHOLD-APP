import Avatar from "@/components/avatar";
import Block from "@/components/Block";
import { chores, topMembers } from "@/constants/fakeData";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          {
            paddingBottom: tabBarHeight,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Block>
          <View style={styles_1.familyCard}>
            <Avatar
              size={90}
              url={""}
              is_pressable={true}
              onPress={() => {
                router.navigate("/");
              }}
            />

            <View style={styles_1.familyInfoWrapper}>
              <Text style={styles_1.familyName}>Название</Text>
              <View style={styles_1.statItem}>
                <View style={styles_1.statRow}>
                  <Text style={styles_1.statLabel}>Общий опыт семьи:</Text>
                  <Text style={styles_1.statValue}>3987</Text>
                </View>
                <View style={styles_1.statRow}>
                  <Text style={styles_1.statLabel}>Выполнено дел за неделю:</Text>
                  <Text style={styles_1.statValue}>14</Text>
                </View>
                <View style={styles_1.statRow}>
                  <Text style={styles_1.statLabel}>Выполнено за месяц:</Text>
                  <Text style={styles_1.statValue}>43</Text>
                </View>
              </View>
            </View>
          </View>
        </Block>
        <Block blockTitle="Лидеры недели">
          <View style={styles_2.MainCard}>
            {topMembers.map((member, index) => {
              return (
                <TouchableOpacity
                  key={member.id}
                  activeOpacity={0.8}
                  onPress={() => {
                    router.navigate({
                      pathname: "/",
                      params: {
                        username: member.username,
                        id: member.id,
                      },
                    });
                  }}
                >
                  <View style={styles_2.memberButtonContent}>
                    <Avatar size={40} url={member.avatarURL} is_pressable={false} />
                    <Text style={styles_2.memberName}>{member.name}</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={styles_2.memberCount}>
                      {member.choresCount} заданий
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Block>
        <Block
          blockTitle="Домашние дела"
          style={{ backgroundColor: null, padding: 0, margin: 6 }}
        >
          <View style={styles_3.choresWrapper}>
            {chores.map((chore) => (
              <TouchableOpacity
                key={chore.id}
                style={styles_3.choreCard}
                onPress={() => console.log(`Выполнил: ${chore.title}`)}
              >
                <Text style={styles_3.choreIcon}>{chore.icon}</Text>
                <Text style={styles_3.choreText}>{chore.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles_1 = StyleSheet.create({
  familyCard: {
    flexDirection: "row",
    gap: 8,
  },
  familyInfoWrapper: {
    flex: 1,
  },
  familyName: {
    fontSize: 30,
    fontWeight: "700",
  },
  statItem: {
    flexDirection: "column",
    gap: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
  statValue: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
});

const styles_2 = StyleSheet.create({
  MainCard: {
    flexDirection: "column",
    gap: 8,
  },
  memberButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  memberName: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  memberCount: {
    fontSize: 17,
    color: "#E0E0E0",
    fontWeight: "bold",
  },
});

const styles_3 = StyleSheet.create({
  choresWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  choreCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a1a1a1ff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "48%",
  },
  choreIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  choreText: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
});
