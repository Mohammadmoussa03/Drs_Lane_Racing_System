import { Metadata } from "next";
import Link from "next/link";
import { 
  Trophy, Timer, Flag, TrendingUp, Calendar, 
  Award, ChevronLeft, Medal
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - in real app this would come from API
const driverData = {
  nickname: "VELOCITY_X",
  tier: "Elite",
  rank: 1,
  bio: "Professional karting enthusiast with a passion for speed. Started racing at DRS Lane in 2024 and quickly climbed to the top of the leaderboard.",
  memberSince: "Jan 2024",
  stats: {
    points: 2847,
    wins: 23,
    podiums: 52,
    fastestLaps: 31,
    totalRaces: 71,
    winRate: 32.4,
    avgPosition: 2.1,
  },
  recentResults: [
    { race: "Championship Qualifier", position: 1, date: "Apr 7, 2026", points: 25, fastestLap: true },
    { race: "Evening Endurance", position: 2, date: "Apr 5, 2026", points: 18, fastestLap: false },
    { race: "Sunday Sprint", position: 1, date: "Apr 3, 2026", points: 25, fastestLap: true },
    { race: "Midweek Madness", position: 3, date: "Apr 1, 2026", points: 15, fastestLap: false },
    { race: "Night Challenge", position: 1, date: "Mar 29, 2026", points: 26, fastestLap: true },
  ],
  achievements: [
    { name: "First Victory", icon: "trophy", description: "Win your first race", earned: true },
    { name: "Hat Trick", icon: "medal", description: "Win 3 races in a row", earned: true },
    { name: "Speed Demon", icon: "timer", description: "Set 10 fastest laps", earned: true },
    { name: "Century Club", icon: "flag", description: "Complete 100 races", earned: false },
    { name: "Champion", icon: "award", description: "Win a championship", earned: true },
  ],
  championships: [
    { name: "2026 Grand Prix Championship", position: 1, points: 187, status: "Active" },
    { name: "2025 Grand Prix Championship", position: 1, points: 312, status: "Champion" },
    { name: "2025 Summer Sprint Series", position: 2, points: 245, status: "Completed" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ nickname: string }> }): Promise<Metadata> {
  const { nickname } = await params;
  return {
    title: `${nickname.toUpperCase()} | DRS Lane Racing`,
    description: `View the profile, stats, and race history of ${nickname.toUpperCase()} at DRS Lane Racing.`,
  };
}

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

function getPositionColor(position: number) {
  switch (position) {
    case 1:
      return "text-gold bg-gold/10";
    case 2:
      return "text-silver bg-silver/10";
    case 3:
      return "text-bronze bg-bronze/10";
    default:
      return "text-muted-foreground bg-secondary";
  }
}

export default async function DriverProfilePage({ params }: { params: Promise<{ nickname: string }> }) {
  const { nickname } = await params;
  const driver = driverData; // In real app, fetch by nickname

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-12 bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Link */}
          <Link
            href="/drivers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Drivers
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-secondary rounded-sm flex items-center justify-center border-2 border-primary/30">
                <span className="text-5xl md:text-6xl font-bold text-primary">
                  {driver.nickname.charAt(0)}
                </span>
              </div>
              {/* Rank Badge */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gold rounded-sm flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-background">#{driver.rank}</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {driver.nickname}
                </h1>
                <span className={cn(
                  "px-3 py-1 text-sm font-bold rounded-sm border",
                  getTierColor(driver.tier)
                )}>
                  {driver.tier}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl">
                {driver.bio}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Member since {driver.memberSince}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="racing-stripes h-1 absolute bottom-0 left-0 right-0" />
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Career Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/50 rounded-sm">
                    <Trophy className="w-6 h-6 mx-auto text-gold mb-2" />
                    <div className="text-3xl font-bold text-foreground">{driver.stats.wins}</div>
                    <div className="text-sm text-muted-foreground">Wins</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-sm">
                    <Medal className="w-6 h-6 mx-auto text-silver mb-2" />
                    <div className="text-3xl font-bold text-foreground">{driver.stats.podiums}</div>
                    <div className="text-sm text-muted-foreground">Podiums</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-sm">
                    <Timer className="w-6 h-6 mx-auto text-primary mb-2" />
                    <div className="text-3xl font-bold text-foreground">{driver.stats.fastestLaps}</div>
                    <div className="text-sm text-muted-foreground">Fastest Laps</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-sm">
                    <Flag className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                    <div className="text-3xl font-bold text-foreground">{driver.stats.totalRaces}</div>
                    <div className="text-sm text-muted-foreground">Races</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{driver.stats.winRate}%</div>
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{driver.stats.avgPosition}</div>
                    <div className="text-sm text-muted-foreground">Avg. Position</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">{driver.stats.points.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-secondary/30">
                  <h2 className="text-xl font-bold text-foreground">Recent Results</h2>
                </div>
                <div className="divide-y divide-border">
                  {driver.recentResults.map((result, index) => (
                    <div key={index} className="flex items-center gap-4 p-4">
                      {/* Position */}
                      <span className={cn(
                        "w-10 h-10 rounded-sm flex items-center justify-center font-bold",
                        getPositionColor(result.position)
                      )}>
                        P{result.position}
                      </span>

                      {/* Race Info */}
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{result.race}</div>
                        <div className="text-sm text-muted-foreground">{result.date}</div>
                      </div>

                      {/* Fastest Lap */}
                      {result.fastestLap && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-sm flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          FL
                        </span>
                      )}

                      {/* Points */}
                      <span className="text-lg font-bold text-primary">
                        +{result.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Championships */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-secondary/30">
                  <h2 className="font-bold text-foreground flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-gold" />
                    Championships
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {driver.championships.map((champ, index) => (
                    <div key={index} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground text-sm">
                          {champ.name}
                        </span>
                        {champ.status === "Champion" && (
                          <Trophy className="w-4 h-4 text-gold" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={cn(
                          "px-2 py-0.5 rounded-sm text-xs font-medium",
                          champ.status === "Active" ? "bg-green-500/10 text-green-500" :
                          champ.status === "Champion" ? "bg-gold/10 text-gold" :
                          "bg-secondary text-muted-foreground"
                        )}>
                          {champ.status === "Champion" ? `P${champ.position} - Champion` : `P${champ.position}`}
                        </span>
                        <span className="text-muted-foreground">
                          {champ.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-secondary/30">
                  <h2 className="font-bold text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Achievements
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {driver.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-sm",
                        achievement.earned ? "bg-secondary/50" : "bg-secondary/20 opacity-50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-sm flex items-center justify-center",
                        achievement.earned ? "bg-primary/10" : "bg-secondary"
                      )}>
                        <Award className={cn(
                          "w-5 h-5",
                          achievement.earned ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={cn(
                          "font-medium text-sm",
                          achievement.earned ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.earned && (
                        <span className="text-xs text-green-500 font-medium">Earned</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
