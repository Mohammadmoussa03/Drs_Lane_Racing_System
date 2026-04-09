import Link from "next/link";
import { cn, calculateWinRate, formatLapTime } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "./tier-badge";
import { PositionBadge } from "./position-badge";
import type { User, DriverStats } from "@/lib/types";
import { Trophy, Target, Timer, TrendingUp } from "lucide-react";

interface DriverCardProps {
  user: User;
  stats: DriverStats;
  rank?: number;
  showRank?: boolean;
  compact?: boolean;
  className?: string;
}

export function DriverCard({
  user,
  stats,
  rank,
  showRank = false,
  compact = false,
  className,
}: DriverCardProps) {
  const winRate = calculateWinRate(stats.wins, stats.total_races);

  if (compact) {
    return (
      <Link href={`/drivers/${user.id}`}>
        <Card
          glow
          className={cn(
            "group p-4 flex items-center gap-4 hover:border-primary/50 transition-all",
            className
          )}
        >
          {showRank && rank && (
            <PositionBadge position={rank} size="md" />
          )}
          <Avatar
            src={user.profile_picture}
            fallback={`${user.first_name} ${user.last_name}`}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold truncate group-hover:text-primary transition-colors">
              {user.first_name} {user.last_name}
            </p>
            <div className="flex items-center gap-2">
              <TierBadge tier={stats.skill_tier} size="sm" showLabel={false} />
              <span className="text-sm text-muted-foreground">
                {stats.total_points.toLocaleString()} pts
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gold">{stats.wins}</p>
            <p className="text-xs text-muted-foreground">Wins</p>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/drivers/${user.id}`}>
      <Card
        glow
        bracket
        className={cn(
          "group relative overflow-hidden p-6 hover:border-primary/50 transition-all",
          className
        )}
      >
        {/* Rank indicator */}
        {showRank && rank && rank <= 3 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-silver to-bronze" />
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {showRank && rank && (
            <PositionBadge position={rank} size="lg" />
          )}
          <Avatar
            src={user.profile_picture}
            fallback={`${user.first_name} ${user.last_name}`}
            size="xl"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold truncate group-hover:text-primary transition-colors">
              {user.first_name} {user.last_name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <TierBadge tier={stats.skill_tier} size="sm" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Level {stats.level} • {stats.experience_points.toLocaleString()} XP
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            icon={Trophy}
            label="Wins"
            value={stats.wins}
            subValue={`${winRate}% win rate`}
            highlight
          />
          <StatItem
            icon={Target}
            label="Podiums"
            value={stats.podiums}
            subValue={`of ${stats.total_races} races`}
          />
          <StatItem
            icon={Timer}
            label="Best Lap"
            value={stats.best_lap_time ? formatLapTime(stats.best_lap_time) : "N/A"}
            mono
          />
          <StatItem
            icon={TrendingUp}
            label="Points"
            value={stats.total_points.toLocaleString()}
            subValue={`Rank #${rank || "?"}`}
          />
        </div>

        {/* Streak indicator */}
        {stats.current_streak > 0 && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Current Streak:</span>
            <span className="font-bold text-primary">
              {stats.current_streak} {stats.current_streak === 1 ? "win" : "wins"}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}

function StatItem({
  icon: Icon,
  label,
  value,
  subValue,
  highlight,
  mono,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  highlight?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-muted rounded-sm">
        <Icon className={cn("h-4 w-4", highlight ? "text-gold" : "text-muted-foreground")} />
      </div>
      <div>
        <p className={cn("font-bold", mono && "font-mono", highlight && "text-gold")}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
        {subValue && (
          <p className="text-xs text-muted-foreground">{subValue}</p>
        )}
      </div>
    </div>
  );
}
