import Link from "next/link";
import { Trophy, Timer, Flag, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const topThree = [
  {
    rank: 2,
    nickname: "APEX_HUNTER",
    tier: "Elite",
    points: 2654,
    wins: 19,
    podiums: 45,
    fastestLaps: 28,
    races: 67,
  },
  {
    rank: 1,
    nickname: "VELOCITY_X",
    tier: "Elite",
    points: 2847,
    wins: 23,
    podiums: 52,
    fastestLaps: 31,
    races: 71,
  },
  {
    rank: 3,
    nickname: "DRIFT_KING",
    tier: "Gold",
    points: 2421,
    wins: 15,
    podiums: 38,
    fastestLaps: 22,
    races: 58,
  },
];

function getPositionConfig(rank: number) {
  switch (rank) {
    case 1:
      return {
        color: "text-gold",
        bgColor: "bg-gold/10",
        borderColor: "border-gold/30",
        height: "h-48 md:h-64",
        order: "order-2",
      };
    case 2:
      return {
        color: "text-silver",
        bgColor: "bg-silver/10",
        borderColor: "border-silver/30",
        height: "h-40 md:h-52",
        order: "order-1",
      };
    case 3:
      return {
        color: "text-bronze",
        bgColor: "bg-bronze/10",
        borderColor: "border-bronze/30",
        height: "h-32 md:h-44",
        order: "order-3",
      };
    default:
      return {
        color: "text-muted-foreground",
        bgColor: "bg-secondary",
        borderColor: "border-border",
        height: "h-32",
        order: "order-4",
      };
  }
}

export function TopThreePodium() {
  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
          TOP 3 DRIVERS
        </h2>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {topThree.map((driver) => {
            const config = getPositionConfig(driver.rank);
            return (
              <Link
                key={driver.rank}
                href={`/drivers/${driver.nickname.toLowerCase()}`}
                className={cn(
                  "group flex-1 max-w-xs",
                  config.order
                )}
              >
                {/* Driver Card */}
                <div className={cn(
                  "bg-background border rounded-t-sm p-4 md:p-6 text-center transition-all group-hover:border-primary/50",
                  config.borderColor
                )}>
                  {/* Avatar */}
                  <div className={cn(
                    "w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center mb-3 border-2",
                    config.bgColor,
                    config.borderColor
                  )}>
                    <span className={cn("text-2xl md:text-3xl font-bold", config.color)}>
                      {driver.nickname.charAt(0)}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-foreground text-sm md:text-base mb-1 group-hover:text-primary transition-colors">
                    {driver.nickname}
                  </h3>
                  <span className={cn("text-xs font-medium", config.color)}>
                    {driver.tier}
                  </span>

                  {/* Points */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className={cn("text-2xl md:text-3xl font-bold", config.color)}>
                      {driver.points.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">PTS</span>
                  </div>

                  {/* Stats (hidden on mobile) */}
                  <div className="hidden md:grid grid-cols-2 gap-2 mt-4 text-xs">
                    <div className="flex items-center justify-center gap-1">
                      <Trophy className="w-3 h-3 text-gold" />
                      <span className="text-foreground">{driver.wins}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Timer className="w-3 h-3 text-primary" />
                      <span className="text-foreground">{driver.fastestLaps}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Flag className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground">{driver.races}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-foreground">{driver.podiums}</span>
                    </div>
                  </div>
                </div>

                {/* Podium Stand */}
                <div className={cn(
                  "flex items-center justify-center rounded-b-sm transition-all",
                  config.bgColor,
                  config.height
                )}>
                  <span className={cn("text-5xl md:text-7xl font-bold opacity-50", config.color)}>
                    {driver.rank}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
