"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TierBadge } from "@/components/racing/tier-badge";
import { PositionText } from "@/components/racing/position-badge";
import { AchievementBadge } from "@/components/racing/achievement-badge";
import { StatsCounter } from "@/components/racing/stats-counter";
import { formatLapTime, calculateWinRate } from "@/lib/utils";
import type { User, DriverStats, Achievement, RaceResult, SkillTier } from "@/lib/types";
import {
  ArrowLeft,
  Trophy,
  Flag,
  Timer,
  Target,
  TrendingUp,
  Flame,
  Star,
  Calendar,
  Award,
  Swords,
  ChevronRight,
} from "lucide-react";

// Mock data
const mockUser: User = {
  id: 1,
  first_name: "Alex",
  last_name: "Thunder",
  email: "alex@example.com",
  bio: "Professional go-kart racer with a passion for speed. 3x championship winner and track record holder. Always pushing the limits on every lap.",
  profile_picture: null,
  is_verified: true,
  created_at: "2023-06-15",
};

const mockStats: DriverStats = {
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
  created_at: "2023-06-15",
  updated_at: "2024-04-08",
};

const mockAchievements: Achievement[] = [
  {
    id: 1,
    name: "First Victory",
    description: "Win your first race",
    category: "racing",
    rarity: "common",
    points: 50,
    requirement_type: "wins",
    requirement_value: 1,
    created_at: "",
  },
  {
    id: 2,
    name: "Hat Trick",
    description: "Win 3 races in a row",
    category: "racing",
    rarity: "rare",
    points: 150,
    requirement_type: "consecutive_wins",
    requirement_value: 3,
    created_at: "",
  },
  {
    id: 3,
    name: "Speed Demon",
    description: "Set a personal best lap time under 45 seconds",
    category: "speed",
    rarity: "epic",
    points: 200,
    requirement_type: "lap_time",
    requirement_value: 45000,
    created_at: "",
  },
  {
    id: 4,
    name: "Century",
    description: "Complete 100 races",
    category: "milestone",
    rarity: "rare",
    points: 175,
    requirement_type: "races",
    requirement_value: 100,
    created_at: "",
  },
  {
    id: 5,
    name: "Champion",
    description: "Win a championship",
    category: "championship",
    rarity: "legendary",
    points: 500,
    requirement_type: "championships",
    requirement_value: 1,
    created_at: "",
  },
  {
    id: 6,
    name: "Consistency King",
    description: "Finish on the podium 50 times",
    category: "consistency",
    rarity: "epic",
    points: 250,
    requirement_type: "podiums",
    requirement_value: 50,
    created_at: "",
  },
];

const mockRecentRaces = [
  { id: 1, name: "Sunday Sprint", position: 1, points: 100, date: "2026-04-08", best_lap: 44120 },
  { id: 2, name: "Pro League R7", position: 2, points: 80, date: "2026-04-05", best_lap: 44350 },
  { id: 3, name: "Championship R4", position: 1, points: 125, date: "2026-04-02", best_lap: 43950 },
  { id: 4, name: "Evening Sprint", position: 1, points: 100, date: "2026-03-30", best_lap: 44080 },
  { id: 5, name: "Weekend Warriors", position: 3, points: 60, date: "2026-03-28", best_lap: 44520 },
];

const xpToNextLevel = 85000;
const xpProgress = (mockStats.experience_points / xpToNextLevel) * 100;
const winRate = calculateWinRate(mockStats.wins, mockStats.total_races);

export default function DriverProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "history">("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link href="/drivers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Drivers
      </Link>

      {/* Profile Header */}
      <Card className="mb-8 overflow-hidden">
        <div className="h-2 racing-stripe" />
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-start gap-4">
              <Avatar
                src={mockUser.profile_picture}
                fallback={`${mockUser.first_name} ${mockUser.last_name}`}
                size="xl"
                className="h-24 w-24"
              />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {mockUser.first_name} {mockUser.last_name}
                  </h1>
                  {mockUser.is_verified && (
                    <Badge variant="success">Verified</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <TierBadge tier={mockStats.skill_tier} />
                  <span className="text-muted-foreground">
                    Level {mockStats.level} • {mockStats.skill_rating} SR
                  </span>
                </div>
                {mockUser.bio && (
                  <p className="text-muted-foreground max-w-xl mt-3">{mockUser.bio}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Member since {new Date(mockUser.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="md:ml-auto flex gap-3">
              <Link href={`/drivers/${mockUser.id}/compare`}>
                <Button variant="outline" className="gap-2">
                  <Swords className="h-4 w-4" />
                  Compare
                </Button>
              </Link>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="font-medium">Level {mockStats.level}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {mockStats.experience_points.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Flag} label="Total Races" value={mockStats.total_races} />
        <StatsCard icon={Trophy} label="Wins" value={mockStats.wins} highlight subValue={`${winRate}% win rate`} />
        <StatsCard icon={Target} label="Podiums" value={mockStats.podiums} />
        <StatsCard icon={TrendingUp} label="Total Points" value={mockStats.total_points.toLocaleString()} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {[
          { id: "overview", label: "Overview" },
          { id: "achievements", label: "Achievements" },
          { id: "history", label: "Race History" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Performance Stats */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold font-mono">
                      {mockStats.best_lap_time ? formatLapTime(mockStats.best_lap_time) : "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">Best Lap Time</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{mockStats.average_finish_position.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Avg. Position</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{mockStats.total_laps.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Laps</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Races */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-primary" />
                  Recent Races
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("history")} className="gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRecentRaces.slice(0, 5).map((race) => (
                    <div
                      key={race.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <PositionText position={race.position} className="text-lg" />
                        <div>
                          <p className="font-medium">{race.name}</p>
                          <p className="text-xs text-muted-foreground">{race.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">+{race.points}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {formatLapTime(race.best_lap)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streaks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  Streaks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Streak</span>
                  <span className="font-bold text-primary text-xl">{mockStats.current_streak} wins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Best Streak</span>
                  <span className="font-bold text-gold text-xl">{mockStats.best_streak} wins</span>
                </div>
              </CardContent>
            </Card>

            {/* Featured Achievements */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
                <Badge variant="secondary">{mockAchievements.length}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAchievements.slice(0, 3).map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      unlocked
                      size="sm"
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => setActiveTab("achievements")}
                >
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              All Achievements
              <Badge variant="secondary">{mockAchievements.length} unlocked</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {mockAchievements.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  unlocked
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              Race History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentRaces.map((race) => (
                <div
                  key={race.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <PositionText position={race.position} className="text-xl" />
                    <div>
                      <p className="font-medium">{race.name}</p>
                      <p className="text-sm text-muted-foreground">{race.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">+{race.points} pts</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      Best: {formatLapTime(race.best_lap)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatsCard({
  icon: Icon,
  label,
  value,
  highlight = false,
  subValue,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  highlight?: boolean;
  subValue?: string;
}) {
  return (
    <Card className={highlight ? "border-primary/30 bg-primary/5" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${highlight ? "bg-primary/20" : "bg-muted"}`}>
            <Icon className={`h-5 w-5 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div>
            <p className={`text-2xl font-bold ${highlight ? "text-primary" : ""}`}>{value}</p>
            <p className="text-xs text-muted-foreground uppercase">{label}</p>
            {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
