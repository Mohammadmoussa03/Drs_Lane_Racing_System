"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeaderboardRow } from "@/components/racing/leaderboard-row";
import { PodiumDisplay } from "@/components/racing/podium-display";
import { TierBadge } from "@/components/racing/tier-badge";
import type { LeaderboardEntry, SkillTier } from "@/lib/types";
import {
  Trophy,
  Calendar,
  TrendingUp,
  Timer,
  Target,
  Medal,
} from "lucide-react";

// Mock data
const generateMockLeaderboard = (count: number): LeaderboardEntry[] => {
  const names = [
    ["Alex", "Thunder"], ["Maria", "Speed"], ["Jake", "Velocity"],
    ["Sarah", "Swift"], ["Mike", "Turbo"], ["Emma", "Flash"],
    ["Chris", "Nitro"], ["Lisa", "Blaze"], ["Tom", "Drift"],
    ["Anna", "Storm"], ["Ryan", "Ace"], ["Kate", "Fury"],
    ["James", "Bolt"], ["Sophie", "Blitz"], ["David", "Racer"],
    ["Lucy", "Zoom"], ["Mark", "Rush"], ["Nina", "Spark"],
    ["Paul", "Strike"], ["Rachel", "Surge"],
  ];
  
  const tiers: SkillTier[] = ["legend", "elite", "pro", "semi-pro", "amateur", "rookie"];
  
  return Array.from({ length: count }, (_, i) => {
    const tierIndex = Math.min(Math.floor(i / 4), tiers.length - 1);
    const nameIndex = i % names.length;
    
    return {
      rank: i + 1,
      user: {
        id: i + 1,
        first_name: names[nameIndex][0],
        last_name: names[nameIndex][1],
        email: "",
        is_verified: true,
        created_at: "",
      },
      stats: {
        id: i + 1,
        user: i + 1,
        skill_tier: tiers[tierIndex],
        skill_rating: 2500 - i * 50,
        total_races: 100 - i * 2,
        wins: Math.max(50 - i * 2, 1),
        podiums: Math.max(70 - i * 2, 3),
        best_lap_time: 44000 + i * 100,
        average_finish_position: 1 + i * 0.2,
        total_laps: 2000 - i * 50,
        total_points: 15000 - i * 500,
        current_streak: Math.max(10 - i, 0),
        best_streak: 15 - Math.floor(i / 2),
        experience_points: 50000 - i * 1000,
        level: 50 - Math.floor(i / 2),
        created_at: "",
        updated_at: "",
      },
      change: Math.floor(Math.random() * 5) - 2, // Random change -2 to +2
    };
  });
};

const mockLeaderboard = generateMockLeaderboard(20);

const periodFilters = [
  { value: "all_time", label: "All Time" },
  { value: "season", label: "This Season" },
  { value: "month", label: "This Month" },
  { value: "week", label: "This Week" },
];

const metricFilters = [
  { value: "points", label: "Total Points", icon: Trophy },
  { value: "wins", label: "Wins", icon: Medal },
  { value: "podiums", label: "Podiums", icon: Target },
  { value: "best_lap", label: "Best Lap Time", icon: Timer },
];

const tierFilters: { value: SkillTier | "all"; label: string }[] = [
  { value: "all", label: "All Tiers" },
  { value: "legend", label: "Legend" },
  { value: "elite", label: "Elite" },
  { value: "pro", label: "Pro" },
  { value: "semi-pro", label: "Semi-Pro" },
  { value: "amateur", label: "Amateur" },
  { value: "rookie", label: "Rookie" },
];

// Mock current user ID
const CURRENT_USER_ID = 5;

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("all_time");
  const [metric, setMetric] = useState("points");
  const [tierFilter, setTierFilter] = useState<SkillTier | "all">("all");

  const filteredLeaderboard = mockLeaderboard.filter((entry) => {
    if (tierFilter === "all") return true;
    return entry.stats.skill_tier === tierFilter;
  });

  const topThree = filteredLeaderboard.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-primary">Leaderboard</span>
        </h1>
        <p className="text-muted-foreground">
          The best racers competing for glory. Where do you rank?
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Period Filter */}
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Time Period
              </p>
              <div className="flex flex-wrap gap-2">
                {periodFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={period === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod(filter.value)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Metric Filter */}
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Ranking By
              </p>
              <div className="flex flex-wrap gap-2">
                {metricFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={metric === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMetric(filter.value)}
                    className="gap-1"
                  >
                    <filter.icon className="h-3 w-3" />
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tier Filter */}
            <div>
              <p className="text-sm font-medium mb-2">Skill Tier</p>
              <div className="flex flex-wrap gap-2">
                {tierFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={tierFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTierFilter(filter.value)}
                  >
                    {filter.value !== "all" ? (
                      <TierBadge tier={filter.value} size="sm" showLabel={false} className="mr-1" />
                    ) : null}
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Podium Display */}
      <Card className="mb-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <CardContent className="p-8 relative">
          <div className="text-center mb-6">
            <Trophy className="h-12 w-12 text-gold mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Top 3 Drivers</h2>
            <p className="text-muted-foreground">
              {periodFilters.find((p) => p.value === period)?.label} •{" "}
              {metricFilters.find((m) => m.value === metric)?.label}
            </p>
          </div>
          <PodiumDisplay entries={topThree} />
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Full Rankings</span>
            <Badge variant="secondary">{filteredLeaderboard.length} drivers</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLeaderboard.map((entry) => (
              <LeaderboardRow
                key={entry.user.id}
                entry={entry}
                isCurrentUser={entry.user.id === CURRENT_USER_ID}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Position (if not in visible range) */}
      {!filteredLeaderboard.some((e) => e.user.id === CURRENT_USER_ID) && (
        <Card className="mt-6 border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center mb-2">Your Position</p>
            <LeaderboardRow
              entry={{
                rank: 42,
                user: {
                  id: CURRENT_USER_ID,
                  first_name: "John",
                  last_name: "Racer",
                  email: "",
                  is_verified: true,
                  created_at: "",
                },
                stats: {
                  id: CURRENT_USER_ID,
                  user: CURRENT_USER_ID,
                  skill_tier: "semi-pro",
                  skill_rating: 1850,
                  total_races: 47,
                  wins: 12,
                  podiums: 28,
                  best_lap_time: 45230,
                  average_finish_position: 3.2,
                  total_laps: 892,
                  total_points: 4520,
                  current_streak: 3,
                  best_streak: 7,
                  experience_points: 12500,
                  level: 24,
                  created_at: "",
                  updated_at: "",
                },
                change: 2,
              }}
              isCurrentUser
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
