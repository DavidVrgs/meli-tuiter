import dayjs from "dayjs";

export function timeAgoShort(date: string | Date): string {
  const now = dayjs();
  const inputDate = dayjs(date);
  const seconds = now.diff(inputDate, "second");
  const minutes = now.diff(inputDate, "minute");
  const hours = now.diff(inputDate, "hour");

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;

  return inputDate.format("D MMM"); // Ej: "13 may"
}
