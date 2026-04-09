import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const ms = Math.floor((secs % 1) * 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
}

export function formatLapTime(milliseconds: number): string {
  const totalSeconds = milliseconds / 1000;
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  const ms = Math.floor(milliseconds % 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
}

export function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function calculateWinRate(wins: number, totalRaces: number): number {
  if (totalRaces === 0) return 0;
  return Math.round((wins / totalRaces) * 100);
}

export function getTierColor(tier: string): string {
  const tierColors: Record<string, string> = {
    rookie: "bg-tier-rookie text-white",
    amateur: "bg-tier-amateur text-white",
    "semi-pro": "bg-tier-semi-pro text-white",
    pro: "bg-tier-pro text-white",
    elite: "bg-tier-elite text-black",
    legend: "bg-tier-legend text-white",
  };
  return tierColors[tier.toLowerCase()] || tierColors.rookie;
}

export function getPositionColor(position: number): string {
  if (position === 1) return "text-gold";
  if (position === 2) return "text-silver";
  if (position === 3) return "text-bronze";
  return "text-muted-foreground";
}
