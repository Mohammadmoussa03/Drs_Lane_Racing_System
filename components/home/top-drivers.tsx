import Link from "next/link";
import { ArrowRight, Trophy, Zap, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

const topDrivers = [
  {
    rank: 1,
    nickname: "VELOCITY_X",
    tier: "Elite",
    points: 2847,
    wins: 23,
    fastestLaps: 31,
    avatar: null,
  },
  {
    rank: 2,
    nickname: "APEX_HUNTER",
    tier: "Elite",
    points: 2654,
    wins: 19,
    fastestLaps: 28,
    avatar: null,
  },
  {
    rank: 3,
    nickname: "DRIFT_KING",
    tier: "Gold",
    points: 2421,
    wins: 15,
    fastestLaps: 22,
    avatar: null,
  },
  {
    rank: 4,
    nickname: "TURBO_RACER",
    tier: "Gold",
    points: 2198,
    wins: 12,
    fastestLaps: 18,
    avatar: null,
  },
  {
    rank: 5,
    nickname: "NITRO_BLAZE",
    tier: "Gold",
    points: 1987,
    wins: 10,
    fastestLaps: 15,
    avatar: null,
  },
];

function getTierColor(tier: string) {
  switch (tier) {
    case "Elite":
      return "text-primary bg-primary/10 border-primary/30";
    case "Gold":
      return "text-gold bg-gold/10 border-gold/30";
    case "Silver":
      return "text-silver bg-silver/10 border-silver/30";
    default:
      return "text-bronze bg-bronze/10 border-bronze/30";
  }
}

function getPositionStyle(rank: number) {
  switch (rank) {
    case 1:
      return "text-gold";
    case 2:
      return "text-silver";
    case 3:
      return "text-bronze";
    default:
      return "text-muted-foreground";
  }
}

export function TopDrivers() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
              TOP DRIVERS
            </h2>
            <p className="text-muted-foreground">
              The fastest racers climbing the leaderboard this season.
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
          >
            Full Leaderboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topDrivers.map((driver, index) => (
            <Link
              key={driver.rank}
              href={`/drivers/${driver.nickname.toLowerCase()}`}
              className={cn(
                "group relative bg-background rounded-sm border border-border p-5 hover:border-primary/50 transition-all",
                index === 0 && "md:col-span-2 md:row-span-2"
              )}
            >
              {/* Position Badge */}
              <div
                className={cn(
                  "absolute -top-3 -left-3 w-10 h-10 bg-card border border-border rounded-sm flex items-center justify-center font-bold text-lg",
                  getPositionStyle(driver.rank)
                )}
              >
                P{driver.rank}
              </div>

              {/* Avatar Placeholder */}
              <div className={cn(
                "mx-auto mb-4 bg-secondary rounded-sm flex items-center justify-center overflow-hidden",
                index === 0 ? "w-24 h-24" : "w-16 h-16"
              )}>
                <span className={cn(
                  "font-bold text-muted-foreground",
                  index === 0 ? "text-2xl" : "text-lg"
                )}>
                  {driver.nickname.charAt(0)}
                </span>
              </div>

              {/* Driver Info */}
              <div className="text-center">
                <h3 className={cn(
                  "font-bold text-foreground mb-2 group-hover:text-primary transition-colors",
                  index === 0 ? "text-xl" : "text-sm"
                )}>
                  {driver.nickname}
                </h3>

                {/* Tier Badge */}
                <span
                  className={cn(
                    "inline-block px-2 py-0.5 text-xs font-medium rounded-sm border mb-3",
                    getTierColor(driver.tier)
                  )}
                >
                  {driver.tier}
                </span>

                {/* Stats */}
                <div className={cn(
                  "flex items-center justify-center gap-4 text-muted-foreground",
                  index === 0 ? "flex-row" : "flex-col gap-2"
                )}>
                  <div className="flex items-center gap-1">
                    <Trophy className={cn("text-gold", index === 0 ? "w-4 h-4" : "w-3 h-3")} />
                    <span className={cn("font-medium text-foreground", index === 0 ? "text-sm" : "text-xs")}>
                      {driver.wins}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className={cn("text-primary", index === 0 ? "w-4 h-4" : "w-3 h-3")} />
                    <span className={cn("font-medium text-foreground", index === 0 ? "text-sm" : "text-xs")}>
                      {driver.fastestLaps}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <div className={cn(
                  "mt-3 pt-3 border-t border-border",
                  index === 0 ? "text-2xl" : "text-lg"
                )}>
                  <span className="font-bold text-primary">{driver.points.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-1">PTS</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
