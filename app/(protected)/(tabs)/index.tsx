import { getChores, getChoresCompletion, getChoresConfirmations } from "@/api/chore";
import { getMeFamily } from "@/api/family";
import Avatar from "@/components/avatar";
import Block from "@/components/Block";
import ConfirmationCard, { ChoreHistoryCard, ChoreItem } from "@/components/chores";
import { PressableText } from "@/components/pressableText";
import { topMembers } from "@/constants/fakeData";
import {
  ChoreCompletionResponse,
  ChoreConfirmationResponse,
  Chores,
  StatusType,
} from "@/types/chores";
import { FamilyMembersResponse } from "@/types/family";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [familyData, setFamilyData] = useState<FamilyMembersResponse | null>(null);
  const [choresData, setChoresData] = useState<Chores | null>(null);
  const [choresHistoryData, setChoresHistoryData] = useState<
    ChoreCompletionResponse[] | null
  >(null);
  const [choresConfirmData, setchoresConfirmData] = useState<
    ChoreConfirmationResponse[] | null
  >(null);

  const fetchData = async () => {
    const responseFamily = await getMeFamily();
    setFamilyData(responseFamily);
    const responseChores = await getChores();
    setChoresData(responseChores);
    const responseChoresHistory = await getChoresCompletion({
      offset: 0,
      limit: 5,
    });
    setChoresHistoryData(responseChoresHistory);
    const responseChoresConfirm = await getChoresConfirmations(StatusType.AWAITS);
    setchoresConfirmData(responseChoresConfirm);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1, backgroundColor: "#F0F4F8" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          {
            paddingBottom: tabBarHeight,
          },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Block>
          <View style={styles_1.familyCard}>
            <Avatar
              size={90}
              url={familyData?.family.avatar_url}
              is_pressable={true}
              onPress={() => {
                router.navigate("/");
              }}
            />

            <View style={styles_1.familyInfoWrapper}>
              <Text style={styles_1.familyName}>{familyData?.family.name}</Text>
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
                    <Avatar size={40} url={undefined} is_pressable={false} />
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
            {choresData?.chores.slice(0, 8).map((item) => (
              <ChoreItem key={item.id} chore={item} />
            ))}
          </View>
        </Block>
        <Block
          blockTitle="История заданий"
          style={{ backgroundColor: null, padding: 0, margin: 6 }}
        >
          <View style={styles_4.choresHistoryWrapper}>
            {choresHistoryData?.slice(0, 8).map((item) => (
              <ChoreHistoryCard key={item.id} item={item} />
            ))}
          </View>
          <PressableText to="modals/newmodal">Показать всё</PressableText>
        </Block>
        <Block
          blockTitle="Необходимо подтвердить"
          style={{ backgroundColor: null, padding: 0, margin: 6 }}
        >
          <View style={styles_5.choresHistoryWrapper}>
            {choresConfirmData?.slice(0, 4).map((item) => (
              <ConfirmationCard
                key={item.id}
                itemId={item.id}
                chore_completion={item.chore_completion}
                onApprove={async () => {}}
                onCancel={async () => {}}
              />
            ))}
          </View>
          <PressableText to="/modals/modal">Показать всё</PressableText>
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
    color: "gray",
    fontSize: 17,
    fontWeight: "500",
  },
  statValue: {
    color: "gray",
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
});

const styles_4 = StyleSheet.create({
  choresHistoryWrapper: {
    gap: 8,
  },
});

const styles_5 = StyleSheet.create({
  choresHistoryWrapper: {
    gap: 8,
  },
});
