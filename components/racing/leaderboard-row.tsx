"use client";

import Link from "next/link";
import { cn, calculateWinRate } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "./tier-badge";
import { PositionBadge } from "./position-badge";
import type { LeaderboardEntry } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
  className?: string;
}

export function LeaderboardRow({
  entry,
  isCurrentUser = false,
  className,
}: LeaderboardRowProps) {
  const { rank, user, stats, change = 0 } = entry;
  const isPodium = rank <= 3;
  const winRate = calculateWinRate(stats.wins, stats.total_races);

  const ChangeIcon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;
  const changeColor = change > 0 ? "text-success" : change < 0 ? "text-error" : "text-muted-foreground";

  return (
    <Link href={`/drivers/${user.id}`}>
      <div
        className={cn(
          "group flex items-center gap-4 p-4 bg-card border border-border hover:border-primary/50 transition-all",
          isPodium && "border-l-2",
          rank === 1 && "border-l-gold",
          rank === 2 && "border-l-silver",
          rank === 3 && "border-l-bronze",
          isCurrentUser && "bg-primary/5 border-primary/30",
          className
        )}
      >
        {/* Position */}
        <div className="w-12 flex justify-center">
          <PositionBadge position={rank} size="md" />
        </div>

        {/* Change Indicator */}
        <div className={cn("w-8 flex items-center justify-center", changeColor)}>
          <ChangeIcon className="h-4 w-4" />
          {change !== 0 && (
            <span className="text-xs font-semibold ml-0.5">
              {Math.abs(change)}
            </span>
          )}
        </div>

        {/* Driver Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar
            src={user.profile_picture}
            fallback={`${user.first_name} ${user.last_name}`}
            size="md"
          />
          <div className="min-w-0">
            <p className="font-bold truncate group-hover:text-primary transition-colors">
              {user.first_name} {user.last_name}
              {isCurrentUser && (
                <span className="ml-2 text-xs text-primary">(You)</span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <TierBadge tier={stats.skill_tier} size="sm" showLabel={false} />
              <span className="text-xs text-muted-foreground">
                Level {stats.level}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-8">
          <div className="text-center">
            <p className="font-bold text-gold">{stats.wins}</p>
            <p className="text-xs text-muted-foreground">Wins</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{stats.podiums}</p>
            <p className="text-xs text-muted-foreground">Podiums</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{stats.total_races}</p>
            <p className="text-xs text-muted-foreground">Races</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{winRate}%</p>
            <p className="text-xs text-muted-foreground">Win Rate</p>
          </div>
        </div>

        {/* Points */}
        <div className="text-right min-w-[80px]">
          <p className="text-xl font-bold font-mono">
            {stats.total_points.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Points</p>
        </div>
      </div>
    </Link>
  );
}

// Compact version for sidebars
export function LeaderboardRowCompact({
  entry,
  isCurrentUser = false,
}: {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}) {
  const { rank, user, stats } = entry;

  return (
    <Link href={`/drivers/${user.id}`}>
      <div
        className={cn(
          "flex items-center gap-3 p-2 hover:bg-muted/50 rounded-sm transition-colors",
          isCurrentUser && "bg-primary/5"
        )}
      >
        <PositionBadge position={rank} size="sm" />
        <Avatar
          src={user.profile_picture}
          fallback={`${user.first_name} ${user.last_name}`}
          size="sm"
        />
        <span className="flex-1 text-sm font-medium truncate">
          {user.first_name} {user.last_name[0]}.
        </span>
        <span className="text-sm font-bold font-mono">
          {stats.total_points.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
