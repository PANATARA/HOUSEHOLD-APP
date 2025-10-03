export function getWeekRange(): { monday: string; sunday: string } {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const format = (date: Date) => date.toISOString().split("T")[0];
  return { monday: format(monday), sunday: format(sunday) };
}
