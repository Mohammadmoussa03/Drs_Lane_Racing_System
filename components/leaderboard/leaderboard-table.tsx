"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Timer, TrendingUp, TrendingDown, Minus, ChevronUp, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const drivers = [
  { rank: 1, nickname: "VELOCITY_X", tier: "Elite", points: 2847, wins: 23, podiums: 52, fastestLaps: 31, races: 71, change: 0 },
  { rank: 2, nickname: "APEX_HUNTER", tier: "Elite", points: 2654, wins: 19, podiums: 45, fastestLaps: 28, races: 67, change: 1 },
  { rank: 3, nickname: "DRIFT_KING", tier: "Gold", points: 2421, wins: 15, podiums: 38, fastestLaps: 22, races: 58, change: -1 },
  { rank: 4, nickname: "TURBO_RACER", tier: "Gold", points: 2198, wins: 12, podiums: 32, fastestLaps: 18, races: 54, change: 2 },
  { rank: 5, nickname: "NITRO_BLAZE", tier: "Gold", points: 1987, wins: 10, podiums: 28, fastestLaps: 15, races: 49, change: 0 },
  { rank: 6, nickname: "THUNDER_BOLT", tier: "Gold", points: 1876, wins: 9, podiums: 25, fastestLaps: 14, races: 47, change: -2 },
  { rank: 7, nickname: "SPEED_DEMON", tier: "Silver", points: 1654, wins: 7, podiums: 21, fastestLaps: 11, races: 42, change: 1 },
  { rank: 8, nickname: "RACING_STAR", tier: "Silver", points: 1543, wins: 6, podiums: 19, fastestLaps: 9, races: 40, change: 0 },
  { rank: 9, nickname: "QUICK_SILVER", tier: "Silver", points: 1432, wins: 5, podiums: 17, fastestLaps: 8, races: 38, change: 3 },
  { rank: 10, nickname: "FAST_FURY", tier: "Silver", points: 1321, wins: 4, podiums: 15, fastestLaps: 7, races: 35, change: -1 },
  { rank: 11, nickname: "APEX_RACER", tier: "Silver", points: 1210, wins: 4, podiums: 13, fastestLaps: 6, races: 33, change: 0 },
  { rank: 12, nickname: "TURBO_KING", tier: "Bronze", points: 1098, wins: 3, podiums: 11, fastestLaps: 5, races: 30, change: 2 },
  { rank: 13, nickname: "SPEED_RACER", tier: "Bronze", points: 987, wins: 2, podiums: 9, fastestLaps: 4, races: 28, change: -1 },
  { rank: 14, nickname: "DRIFT_ACE", tier: "Bronze", points: 876, wins: 2, podiums: 8, fastestLaps: 3, races: 25, change: 0 },
  { rank: 15, nickname: "NITRO_RIDER", tier: "Bronze", points: 765, wins: 1, podiums: 6, fastestLaps: 2, races: 22, change: 1 },
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

function getPositionColor(rank: number) {
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

export function LeaderboardTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"points" | "wins" | "fastestLaps">("points");

  const filteredDrivers = drivers.filter((driver) =>
    driver.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    return b[sortBy] - a[sortBy];
  });

  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-foreground">Full Standings</h2>
          
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-background border border-border rounded-sm text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="points">Sort by Points</option>
              <option value="wins">Sort by Wins</option>
              <option value="fastestLaps">Sort by Fastest Laps</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Pos
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Driver
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                Tier
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Points
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                <div className="flex items-center justify-end gap-1">
                  <Trophy className="w-3 h-3 text-gold" />
                  Wins
                </div>
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                Podiums
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                <div className="flex items-center justify-end gap-1">
                  <Timer className="w-3 h-3 text-primary" />
                  FL
                </div>
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                Races
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedDrivers.map((driver, index) => (
              <tr
                key={driver.rank}
                className="hover:bg-secondary/30 transition-colors"
              >
                {/* Position */}
                <td className="px-4 py-4">
                  <span className={cn("text-lg font-bold", getPositionColor(index + 1))}>
                    {index + 1}
                  </span>
                </td>

                {/* Driver */}
                <td className="px-4 py-4">
                  <Link
                    href={`/drivers/${driver.nickname.toLowerCase()}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center">
                      <span className="font-bold text-muted-foreground">
                        {driver.nickname.charAt(0)}
                      </span>
                    </div>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {driver.nickname}
                    </span>
                  </Link>
                </td>

                {/* Tier */}
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-sm border",
                    getTierColor(driver.tier)
                  )}>
                    {driver.tier}
                  </span>
                </td>

                {/* Points */}
                <td className="px-4 py-4 text-right">
                  <span className="text-lg font-bold text-primary">
                    {driver.points.toLocaleString()}
                  </span>
                </td>

                {/* Wins */}
                <td className="px-4 py-4 text-right hidden md:table-cell">
                  <span className="font-medium text-foreground">{driver.wins}</span>
                </td>

                {/* Podiums */}
                <td className="px-4 py-4 text-right hidden lg:table-cell">
                  <span className="font-medium text-foreground">{driver.podiums}</span>
                </td>

                {/* Fastest Laps */}
                <td className="px-4 py-4 text-right hidden md:table-cell">
                  <span className="font-medium text-foreground">{driver.fastestLaps}</span>
                </td>

                {/* Races */}
                <td className="px-4 py-4 text-right hidden lg:table-cell">
                  <span className="text-muted-foreground">{driver.races}</span>
                </td>

                {/* Trend */}
                <td className="px-4 py-4 hidden sm:table-cell">
                  <div className="flex items-center justify-center">
                    {driver.change > 0 ? (
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-medium">+{driver.change}</span>
                      </div>
                    ) : driver.change < 0 ? (
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-xs font-medium">{driver.change}</span>
                      </div>
                    ) : (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-secondary/30">
        <p className="text-sm text-muted-foreground text-center">
          Showing {sortedDrivers.length} of {drivers.length} drivers
        </p>
      </div>
    </div>
  );
}
