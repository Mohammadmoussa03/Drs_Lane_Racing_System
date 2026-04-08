"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Timer, Flag, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const drivers = [
  { nickname: "VELOCITY_X", tier: "Elite", points: 2847, wins: 23, fastestLaps: 31, races: 71 },
  { nickname: "APEX_HUNTER", tier: "Elite", points: 2654, wins: 19, fastestLaps: 28, races: 67 },
  { nickname: "DRIFT_KING", tier: "Gold", points: 2421, wins: 15, fastestLaps: 22, races: 58 },
  { nickname: "TURBO_RACER", tier: "Gold", points: 2198, wins: 12, fastestLaps: 18, races: 54 },
  { nickname: "NITRO_BLAZE", tier: "Gold", points: 1987, wins: 10, fastestLaps: 15, races: 49 },
  { nickname: "THUNDER_BOLT", tier: "Gold", points: 1876, wins: 9, fastestLaps: 14, races: 47 },
  { nickname: "SPEED_DEMON", tier: "Silver", points: 1654, wins: 7, fastestLaps: 11, races: 42 },
  { nickname: "RACING_STAR", tier: "Silver", points: 1543, wins: 6, fastestLaps: 9, races: 40 },
  { nickname: "QUICK_SILVER", tier: "Silver", points: 1432, wins: 5, fastestLaps: 8, races: 38 },
  { nickname: "FAST_FURY", tier: "Silver", points: 1321, wins: 4, fastestLaps: 7, races: 35 },
  { nickname: "APEX_RACER", tier: "Silver", points: 1210, wins: 4, fastestLaps: 6, races: 33 },
  { nickname: "TURBO_KING", tier: "Bronze", points: 1098, wins: 3, fastestLaps: 5, races: 30 },
];

const tiers = ["All", "Elite", "Gold", "Silver", "Bronze"];

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

export function DriversGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = driver.nickname.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === "All" || driver.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Tier Filter */}
        <div className="flex gap-2">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-sm transition-colors",
                selectedTier === tier
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filteredDrivers.length} drivers
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDrivers.map((driver, index) => (
          <Link
            key={driver.nickname}
            href={`/drivers/${driver.nickname.toLowerCase()}`}
            className="group bg-card border border-border rounded-sm p-5 hover:border-primary/50 transition-all card-glow"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-secondary rounded-sm flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {driver.nickname.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {driver.nickname}
                </h3>
                <span className={cn(
                  "inline-block px-2 py-0.5 text-xs font-medium rounded-sm border",
                  getTierColor(driver.tier)
                )}>
                  {driver.tier}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-secondary/50 rounded-sm">
                <Trophy className="w-4 h-4 mx-auto text-gold mb-1" />
                <div className="text-sm font-bold text-foreground">{driver.wins}</div>
                <div className="text-xs text-muted-foreground">Wins</div>
              </div>
              <div className="text-center p-2 bg-secondary/50 rounded-sm">
                <Timer className="w-4 h-4 mx-auto text-primary mb-1" />
                <div className="text-sm font-bold text-foreground">{driver.fastestLaps}</div>
                <div className="text-xs text-muted-foreground">FL</div>
              </div>
              <div className="text-center p-2 bg-secondary/50 rounded-sm">
                <Flag className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                <div className="text-sm font-bold text-foreground">{driver.races}</div>
                <div className="text-xs text-muted-foreground">Races</div>
              </div>
            </div>

            {/* Points */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Points</span>
              <span className="text-xl font-bold text-primary">
                {driver.points.toLocaleString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
