"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "./tier-badge";
import type { LeaderboardEntry } from "@/lib/types";
import { Trophy } from "lucide-react";
import Link from "next/link";

interface PodiumDisplayProps {
  entries: LeaderboardEntry[];
  className?: string;
}

export function PodiumDisplay({ entries, className }: PodiumDisplayProps) {
  // Reorder for visual display: 2nd, 1st, 3rd
  const first = entries[0];
  const second = entries[1];
  const third = entries[2];

  if (!first) return null;

  return (
    <div className={cn("flex items-end justify-center gap-4 py-8", className)}>
      {/* Second Place */}
      {second && (
        <PodiumPosition
          entry={second}
          position={2}
          height="h-32"
          color="bg-silver"
        />
      )}

      {/* First Place */}
      <PodiumPosition
        entry={first}
        position={1}
        height="h-40"
        color="bg-gold"
        isWinner
      />

      {/* Third Place */}
      {third && (
        <PodiumPosition
          entry={third}
          position={3}
          height="h-24"
          color="bg-bronze"
        />
      )}
    </div>
  );
}

function PodiumPosition({
  entry,
  position,
  height,
  color,
  isWinner = false,
}: {
  entry: LeaderboardEntry;
  position: number;
  height: string;
  color: string;
  isWinner?: boolean;
}) {
  const { user, stats } = entry;

  return (
    <Link href={`/drivers/${user.id}`} className="group">
      <div className="flex flex-col items-center">
        {/* Winner crown */}
        {isWinner && (
          <Trophy className="h-8 w-8 text-gold mb-2 animate-bounce" />
        )}

        {/* Avatar */}
        <div
          className={cn(
            "relative mb-4 transition-transform group-hover:scale-110",
            isWinner && "ring-4 ring-gold rounded-full"
          )}
        >
          <Avatar
            src={user.profile_picture}
            fallback={`${user.first_name} ${user.last_name}`}
            size={isWinner ? "xl" : "lg"}
          />
        </div>

        {/* Name and stats */}
        <div className="text-center mb-4">
          <p className="font-bold group-hover:text-primary transition-colors">
            {user.first_name} {user.last_name}
          </p>
          <TierBadge tier={stats.skill_tier} size="sm" className="mt-1" />
          <p className="text-lg font-mono font-bold mt-2">
            {stats.total_points.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">points</p>
        </div>

        {/* Podium block */}
        <div
          className={cn(
            "w-24 md:w-32 flex items-center justify-center rounded-t-lg transition-all group-hover:brightness-110",
            height,
            color
          )}
        >
          <span className="text-4xl font-bold text-black">{position}</span>
        </div>
      </div>
    </Link>
  );
}

// Compact horizontal podium for smaller spaces
export function PodiumCompact({
  entries,
  className,
}: {
  entries: LeaderboardEntry[];
  className?: string;
}) {
  const colors = ["bg-gold", "bg-silver", "bg-bronze"];
  const textColors = ["text-gold", "text-silver", "text-bronze"];

  return (
    <div className={cn("space-y-2", className)}>
      {entries.slice(0, 3).map((entry, index) => (
        <Link
          key={entry.user.id}
          href={`/drivers/${entry.user.id}`}
          className="group"
        >
          <div
            className={cn(
              "flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-primary/50 transition-all",
              index === 0 && "border-l-4 border-l-gold"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-black",
                colors[index]
              )}
            >
              {index + 1}
            </div>
            <Avatar
              src={entry.user.profile_picture}
              fallback={`${entry.user.first_name} ${entry.user.last_name}`}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate group-hover:text-primary transition-colors">
                {entry.user.first_name} {entry.user.last_name}
              </p>
            </div>
            <div className="text-right">
              <p className={cn("font-bold font-mono", textColors[index])}>
                {entry.stats.total_points.toLocaleString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
