import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "@/components/racing/tier-badge";
import { PositionText } from "@/components/racing/position-badge";
import { AchievementBadge } from "@/components/racing/achievement-badge";
import { PodiumCompact } from "@/components/racing/podium-display";
import {
  Flag,
  Trophy,
  Timer,
  TrendingUp,
  Calendar,
  ChevronRight,
  Flame,
  Target,
  Star,
  Award,
  Clock,
  Users,
} from "lucide-react";
import type { SkillTier, Achievement, LeaderboardEntry } from "@/lib/types";

// Mock data
const mockUser = {
  id: 1,
  first_name: "John",
  last_name: "Racer",
  email: "john@example.com",
  profile_picture: null,
  is_verified: true,
  created_at: "2024-01-15",
};

const mockStats = {
  id: 1,
  user: 1,
  skill_tier: "semi-pro" as SkillTier,
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
  created_at: "2024-01-15",
  updated_at: "2024-04-08",
};

const mockUpcomingRaces = [
  {
    id: 1,
    name: "Sunday Sprint Series",
    scheduled_time: "2026-04-12T14:00:00Z",
    status: "confirmed",
    kart_number: 7,
  },
  {
    id: 2,
    name: "Pro League Round 3",
    scheduled_time: "2026-04-18T18:00:00Z",
    status: "confirmed",
    kart_number: 12,
  },
];

const mockRecentResults = [
  { race: "Weekend Warriors", position: 1, points: 100, date: "2026-04-05" },
  { race: "Friday Night Lights", position: 3, points: 60, date: "2026-04-03" },
  { race: "Amateur League R5", position: 2, points: 80, date: "2026-03-30" },
  { race: "Time Trial Special", position: 1, points: 100, date: "2026-03-28" },
];

const mockRecentAchievements: Achievement[] = [
  {
    id: 1,
    name: "Hat Trick",
    description: "Win 3 races in a row",
    category: "racing",
    rarity: "rare",
    points: 150,
    requirement_type: "consecutive_wins",
    requirement_value: 3,
    created_at: "2024-01-01",
  },
  {
    id: 2,
    name: "Speed Demon",
    description: "Set a personal best lap time",
    category: "speed",
    rarity: "uncommon",
    points: 75,
    requirement_type: "personal_best",
    requirement_value: 1,
    created_at: "2024-01-01",
  },
];

const mockTopDrivers: LeaderboardEntry[] = [
  {
    rank: 1,
    user: { id: 10, first_name: "Alex", last_name: "Thunder", email: "", is_verified: true, created_at: "" },
    stats: { ...mockStats, total_points: 12450, wins: 47, skill_tier: "legend" as SkillTier },
  },
  {
    rank: 2,
    user: { id: 11, first_name: "Maria", last_name: "Speed", email: "", is_verified: true, created_at: "" },
    stats: { ...mockStats, total_points: 10820, wins: 38, skill_tier: "elite" as SkillTier },
  },
  {
    rank: 3,
    user: { id: 12, first_name: "Jake", last_name: "Velocity", email: "", is_verified: true, created_at: "" },
    stats: { ...mockStats, total_points: 9340, wins: 31, skill_tier: "pro" as SkillTier },
  },
];

const xpToNextLevel = 15000;
const xpProgress = (mockStats.experience_points / xpToNextLevel) * 100;

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar
            src={mockUser.profile_picture}
            fallback={`${mockUser.first_name} ${mockUser.last_name}`}
            size="xl"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {mockUser.first_name}!
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <TierBadge tier={mockStats.skill_tier} size="sm" />
              <span className="text-muted-foreground">
                Level {mockStats.level} • {mockStats.skill_rating} SR
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/races">
            <Button skewed>
              <span>Book a Race</span>
            </Button>
          </Link>
          <Link href={`/drivers/${mockUser.id}`}>
            <Button variant="outline">View Profile</Button>
          </Link>
        </div>
      </div>

      {/* XP Progress */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="font-semibold">Level {mockStats.level}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {mockStats.experience_points.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <Progress value={xpProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {(xpToNextLevel - mockStats.experience_points).toLocaleString()} XP to Level {mockStats.level + 1}
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Flag}
          label="Total Races"
          value={mockStats.total_races}
        />
        <StatCard
          icon={Trophy}
          label="Wins"
          value={mockStats.wins}
          highlight
        />
        <StatCard
          icon={Target}
          label="Podiums"
          value={mockStats.podiums}
        />
        <StatCard
          icon={TrendingUp}
          label="Total Points"
          value={mockStats.total_points.toLocaleString()}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Races */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Races
              </CardTitle>
              <Link href="/races">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {mockUpcomingRaces.length > 0 ? (
                <div className="space-y-4">
                  {mockUpcomingRaces.map((race) => (
                    <div
                      key={race.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Flag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{race.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(race.scheduled_time).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="success">Confirmed</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Kart #{race.kart_number}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No upcoming races</p>
                  <Link href="/races">
                    <Button>Book a Race</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Recent Results
              </CardTitle>
              <Link href={`/drivers/${mockUser.id}`}>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-l-2 border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <PositionText position={result.position} className="text-lg" />
                      <div>
                        <p className="font-medium">{result.race}</p>
                        <p className="text-xs text-muted-foreground">{result.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary">+{result.points}</span>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Recent Achievements
              </CardTitle>
              <Link href={`/drivers/${mockUser.id}#achievements`}>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentAchievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    unlocked
                    size="md"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-primary" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-bold">
                  {Math.round((mockStats.wins / mockStats.total_races) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg. Position</span>
                <span className="font-bold">{mockStats.average_finish_position.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Best Lap</span>
                <span className="font-bold font-mono">
                  {mockStats.best_lap_time
                    ? `${Math.floor(mockStats.best_lap_time / 60000)}:${((mockStats.best_lap_time % 60000) / 1000).toFixed(3).padStart(6, "0")}`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Laps</span>
                <span className="font-bold">{mockStats.total_laps.toLocaleString()}</span>
              </div>
              <hr className="border-border" />
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Current Streak:</span>
                <span className="font-bold text-primary">{mockStats.current_streak} wins</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold" />
                <span className="text-muted-foreground">Best Streak:</span>
                <span className="font-bold text-gold">{mockStats.best_streak} wins</span>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top Drivers
              </CardTitle>
              <Link href="/leaderboard">
                <Button variant="ghost" size="sm" className="gap-1">
                  Full Board <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <PodiumCompact entries={mockTopDrivers} />
            </CardContent>
          </Card>

          {/* Your Rank */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground uppercase mb-1">Your Rank</p>
                <p className="text-4xl font-bold text-primary mb-1">#42</p>
                <p className="text-sm text-muted-foreground">
                  Top 15% of all drivers
                </p>
                <Link href="/leaderboard">
                  <Button variant="outline" size="sm" className="mt-4">
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "border-primary/30 bg-primary/5" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${highlight ? "bg-primary/20" : "bg-muted"}`}>
            <Icon className={`h-5 w-5 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div>
            <p className={`text-2xl font-bold ${highlight ? "text-primary" : ""}`}>{value}</p>
            <p className="text-xs text-muted-foreground uppercase">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
