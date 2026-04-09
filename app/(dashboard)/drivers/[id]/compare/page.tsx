"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "@/components/racing/tier-badge";
import { formatLapTime, calculateWinRate, cn } from "@/lib/utils";
import type { User, DriverStats, SkillTier } from "@/lib/types";
import {
  ArrowLeft,
  Trophy,
  Flag,
  Timer,
  Target,
  TrendingUp,
  Swords,
  ChevronDown,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for driver 1 (current profile)
const mockDriver1: { user: User; stats: DriverStats } = {
  user: {
    id: 1,
    first_name: "Alex",
    last_name: "Thunder",
    email: "alex@example.com",
    profile_picture: null,
    is_verified: true,
    created_at: "2023-06-15",
  },
  stats: {
    id: 1,
    user: 1,
    skill_tier: "legend" as SkillTier,
    skill_rating: 2450,
    total_races: 156,
    wins: 47,
    podiums: 98,
    best_lap_time: 43850,
    average_finish_position: 2.1,
    total_laps: 3240,
    total_points: 15420,
    current_streak: 5,
    best_streak: 12,
    experience_points: 78500,
    level: 48,
    created_at: "",
    updated_at: "",
  },
};

// Mock data for available opponents
const mockOpponents: { user: User; stats: DriverStats }[] = [
  {
    user: { id: 2, first_name: "Maria", last_name: "Speed", email: "", profile_picture: null, is_verified: true, created_at: "" },
    stats: { id: 2, user: 2, skill_tier: "elite" as SkillTier, skill_rating: 2280, total_races: 142, wins: 38, podiums: 85, best_lap_time: 44120, average_finish_position: 2.4, total_laps: 2890, total_points: 12850, current_streak: 2, best_streak: 9, experience_points: 65000, level: 42, created_at: "", updated_at: "" },
  },
  {
    user: { id: 3, first_name: "Jake", last_name: "Velocity", email: "", profile_picture: null, is_verified: true, created_at: "" },
    stats: { id: 3, user: 3, skill_tier: "pro" as SkillTier, skill_rating: 2050, total_races: 98, wins: 22, podiums: 52, best_lap_time: 44580, average_finish_position: 3.1, total_laps: 1950, total_points: 8420, current_streak: 0, best_streak: 6, experience_points: 42000, level: 35, created_at: "", updated_at: "" },
  },
  {
    user: { id: 4, first_name: "Sarah", last_name: "Swift", email: "", profile_picture: null, is_verified: true, created_at: "" },
    stats: { id: 4, user: 4, skill_tier: "semi-pro" as SkillTier, skill_rating: 1850, total_races: 76, wins: 15, podiums: 38, best_lap_time: 45120, average_finish_position: 3.5, total_laps: 1520, total_points: 5890, current_streak: 1, best_streak: 4, experience_points: 28000, level: 28, created_at: "", updated_at: "" },
  },
];

// Mock head-to-head data
const mockH2HStats = {
  totalRaces: 12,
  driver1Wins: 8,
  driver2Wins: 4,
  commonRaces: [
    { name: "Pro League R5", date: "2026-04-01", driver1Pos: 1, driver2Pos: 3 },
    { name: "Sunday Sprint", date: "2026-03-28", driver1Pos: 2, driver2Pos: 1 },
    { name: "Championship R3", date: "2026-03-20", driver1Pos: 1, driver2Pos: 2 },
    { name: "Evening Race", date: "2026-03-15", driver1Pos: 1, driver2Pos: 4 },
    { name: "Weekend Warriors", date: "2026-03-10", driver1Pos: 3, driver2Pos: 2 },
  ],
};

export default function CompareDriversPage() {
  const params = useParams();
  const [selectedOpponent, setSelectedOpponent] = useState(mockOpponents[0]);
  const [showOpponentPicker, setShowOpponentPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const driver1 = mockDriver1;
  const driver2 = selectedOpponent;

  const filteredOpponents = mockOpponents.filter((opponent) =>
    `${opponent.user.first_name} ${opponent.user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const compareStats = [
    {
      label: "Skill Rating",
      icon: TrendingUp,
      d1: driver1.stats.skill_rating,
      d2: driver2.stats.skill_rating,
      format: (v: number) => v.toLocaleString(),
      higherBetter: true,
    },
    {
      label: "Total Races",
      icon: Flag,
      d1: driver1.stats.total_races,
      d2: driver2.stats.total_races,
      format: (v: number) => v.toString(),
      higherBetter: true,
    },
    {
      label: "Wins",
      icon: Trophy,
      d1: driver1.stats.wins,
      d2: driver2.stats.wins,
      format: (v: number) => v.toString(),
      higherBetter: true,
    },
    {
      label: "Win Rate",
      icon: Trophy,
      d1: calculateWinRate(driver1.stats.wins, driver1.stats.total_races),
      d2: calculateWinRate(driver2.stats.wins, driver2.stats.total_races),
      format: (v: number) => `${v}%`,
      higherBetter: true,
    },
    {
      label: "Podiums",
      icon: Target,
      d1: driver1.stats.podiums,
      d2: driver2.stats.podiums,
      format: (v: number) => v.toString(),
      higherBetter: true,
    },
    {
      label: "Best Lap",
      icon: Timer,
      d1: driver1.stats.best_lap_time || 0,
      d2: driver2.stats.best_lap_time || 0,
      format: (v: number) => (v ? formatLapTime(v) : "N/A"),
      higherBetter: false, // Lower is better for lap times
    },
    {
      label: "Avg. Position",
      icon: Target,
      d1: driver1.stats.average_finish_position,
      d2: driver2.stats.average_finish_position,
      format: (v: number) => v.toFixed(1),
      higherBetter: false, // Lower is better
    },
    {
      label: "Total Points",
      icon: TrendingUp,
      d1: driver1.stats.total_points,
      d2: driver2.stats.total_points,
      format: (v: number) => v.toLocaleString(),
      higherBetter: true,
    },
    {
      label: "Best Streak",
      icon: Trophy,
      d1: driver1.stats.best_streak,
      d2: driver2.stats.best_streak,
      format: (v: number) => `${v} wins`,
      higherBetter: true,
    },
  ];

  const getWinner = (d1: number, d2: number, higherBetter: boolean): 1 | 2 | 0 => {
    if (d1 === d2) return 0;
    if (higherBetter) return d1 > d2 ? 1 : 2;
    return d1 < d2 ? 1 : 2;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href={`/drivers/${params.id}`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </Link>

      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Head-to-Head <span className="text-primary">Comparison</span>
        </h1>
        <p className="text-muted-foreground">
          Compare stats and see who comes out on top
        </p>
      </div>

      {/* Driver Comparison Header */}
      <Card className="mb-8 overflow-hidden">
        <div className="h-1 racing-stripe" />
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Driver 1 */}
            <div className="text-center">
              <Avatar
                src={driver1.user.profile_picture}
                fallback={`${driver1.user.first_name} ${driver1.user.last_name}`}
                size="xl"
                className="mx-auto mb-3"
              />
              <h2 className="text-xl font-bold">
                {driver1.user.first_name} {driver1.user.last_name}
              </h2>
              <TierBadge tier={driver1.stats.skill_tier} size="sm" className="mt-2" />
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Swords className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Head-to-Head Record</p>
                <p className="text-2xl font-bold">
                  <span className="text-success">{mockH2HStats.driver1Wins}</span>
                  <span className="text-muted-foreground mx-2">-</span>
                  <span className="text-error">{mockH2HStats.driver2Wins}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {mockH2HStats.totalRaces} common races
                </p>
              </div>
            </div>

            {/* Driver 2 (Selectable) */}
            <div className="text-center relative">
              <button
                onClick={() => setShowOpponentPicker(!showOpponentPicker)}
                className="w-full group"
              >
                <Avatar
                  src={driver2.user.profile_picture}
                  fallback={`${driver2.user.first_name} ${driver2.user.last_name}`}
                  size="xl"
                  className="mx-auto mb-3 group-hover:ring-2 ring-primary transition-all"
                />
                <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                  {driver2.user.first_name} {driver2.user.last_name}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </h2>
                <TierBadge tier={driver2.stats.skill_tier} size="sm" className="mt-2" />
              </button>

              {/* Opponent Picker Dropdown */}
              {showOpponentPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowOpponentPicker(false)} />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 bg-card border border-border rounded-lg shadow-xl z-50 p-3">
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search drivers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {filteredOpponents.map((opponent) => (
                        <button
                          key={opponent.user.id}
                          onClick={() => {
                            setSelectedOpponent(opponent);
                            setShowOpponentPicker(false);
                            setSearchQuery("");
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 p-2 rounded-lg transition-colors",
                            opponent.user.id === driver2.user.id
                              ? "bg-primary/10"
                              : "hover:bg-muted"
                          )}
                        >
                          <Avatar
                            src={opponent.user.profile_picture}
                            fallback={`${opponent.user.first_name} ${opponent.user.last_name}`}
                            size="sm"
                          />
                          <div className="text-left">
                            <p className="font-medium">
                              {opponent.user.first_name} {opponent.user.last_name}
                            </p>
                            <TierBadge tier={opponent.stats.skill_tier} size="sm" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Stats Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {compareStats.map((stat, index) => {
              const winner = getWinner(stat.d1, stat.d2, stat.higherBetter);
              return (
                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                  {/* Driver 1 Value */}
                  <div
                    className={cn(
                      "text-right p-3 rounded-lg",
                      winner === 1 ? "bg-success/10" : "bg-muted/50"
                    )}
                  >
                    <p
                      className={cn(
                        "text-xl font-bold font-mono",
                        winner === 1 ? "text-success" : ""
                      )}
                    >
                      {stat.format(stat.d1)}
                    </p>
                  </div>

                  {/* Stat Label */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <stat.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                  </div>

                  {/* Driver 2 Value */}
                  <div
                    className={cn(
                      "text-left p-3 rounded-lg",
                      winner === 2 ? "bg-success/10" : "bg-muted/50"
                    )}
                  >
                    <p
                      className={cn(
                        "text-xl font-bold font-mono",
                        winner === 2 ? "text-success" : ""
                      )}
                    >
                      {stat.format(stat.d2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Common Races */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            Recent Head-to-Head Races
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockH2HStats.commonRaces.map((race, index) => {
              const d1Won = race.driver1Pos < race.driver2Pos;
              return (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 items-center p-3 bg-muted/50 rounded-lg"
                >
                  {/* Driver 1 Position */}
                  <div className={cn("text-right", d1Won ? "text-success" : "")}>
                    <span className="text-xl font-bold">P{race.driver1Pos}</span>
                  </div>

                  {/* Race Info */}
                  <div className="text-center">
                    <p className="font-medium">{race.name}</p>
                    <p className="text-xs text-muted-foreground">{race.date}</p>
                  </div>

                  {/* Driver 2 Position */}
                  <div className={cn("text-left", !d1Won ? "text-success" : "")}>
                    <span className="text-xl font-bold">P{race.driver2Pos}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
