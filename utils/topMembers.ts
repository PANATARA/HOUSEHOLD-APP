import { Member } from "@/types/family";

export interface Metric {
  user_id: string;
  chores_completions_counts: number;
}

export interface TopMember extends Member {
  choresCount: number;
}

export async function getTopMembers(
  metricData: Metric[],
  members: Member[],
): Promise<TopMember[]> {
  // строим map по статистике: user_id -> count
  const statsMap = new Map(
    (metricData ?? []).map((s) => [s.user_id, s.chores_completions_counts]),
  );

  // обогащаем участников
  const enrichedMembers: TopMember[] = members.map((member) => ({
    ...member,
    choresCount: statsMap.get(member.id) ?? 0,
  }));

  // сортируем и берём только топ-3
  return enrichedMembers.sort((a, b) => b.choresCount - a.choresCount).slice(0, 3);
}
