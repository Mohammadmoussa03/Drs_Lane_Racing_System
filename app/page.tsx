import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCounter } from "@/components/racing/stats-counter";
import { TierBadge } from "@/components/racing/tier-badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Flag,
  Trophy,
  Users,
  Timer,
  ChevronRight,
  Star,
  Zap,
  Target,
  Award,
  BarChart3,
  Calendar,
} from "lucide-react";

// Mock data for the landing page
const upcomingRaces = [
  {
    id: 1,
    name: "Sunday Sprint Series",
    scheduled_time: "2026-04-12T14:00:00Z",
    current_participants: 8,
    max_participants: 12,
    entry_fee: 45,
  },
  {
    id: 2,
    name: "Pro League Qualifier",
    scheduled_time: "2026-04-15T18:00:00Z",
    current_participants: 10,
    max_participants: 10,
    entry_fee: 75,
  },
  {
    id: 3,
    name: "Rookie Rumble",
    scheduled_time: "2026-04-18T16:00:00Z",
    current_participants: 5,
    max_participants: 15,
    entry_fee: 35,
  },
];

const topDrivers = [
  { name: "Alex Thunder", wins: 47, tier: "legend" as const, points: 12450 },
  { name: "Maria Speed", wins: 38, tier: "elite" as const, points: 10820 },
  { name: "Jake Velocity", wins: 31, tier: "pro" as const, points: 9340 },
];

const features = [
  {
    icon: Flag,
    title: "Live Race Booking",
    description: "Book races instantly, join waitlists, and get real-time slot updates.",
  },
  {
    icon: BarChart3,
    title: "Advanced Statistics",
    description: "Track every lap, analyze performance, and watch your skills improve.",
  },
  {
    icon: Trophy,
    title: "Championships",
    description: "Compete in seasonal championships and climb the ranks to legend status.",
  },
  {
    icon: Award,
    title: "Achievements & Badges",
    description: "Unlock achievements, earn badges, and showcase your racing prowess.",
  },
  {
    icon: Users,
    title: "Head-to-Head",
    description: "Compare stats with rivals and settle scores on the track.",
  },
  {
    icon: Target,
    title: "Skill-Based Matching",
    description: "Race against drivers at your level with our tier-based system.",
  },
];

const tiers = [
  { tier: "rookie" as const, description: "Just starting your journey" },
  { tier: "amateur" as const, description: "Building consistent skills" },
  { tier: "semi-pro" as const, description: "Serious competitor" },
  { tier: "pro" as const, description: "Track veteran" },
  { tier: "elite" as const, description: "Top 5% of drivers" },
  { tier: "legend" as const, description: "Hall of fame status" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Grid pattern background */}
          <div className="absolute inset-0 grid-pattern opacity-50" />
          
          {/* Racing stripe accent */}
          <div className="absolute top-0 left-0 right-0 h-1 racing-stripe" />

          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6">
                <Zap className="h-3 w-3 mr-1" />
                Professional Go-Kart Racing
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-balance">Race. Compete.</span>
                <br />
                <span className="text-primary">Dominate.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Join the ultimate go-kart racing platform. Book races, track your stats, 
                compete in championships, and climb the leaderboards to legendary status.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="xl" skewed className="w-full sm:w-auto">
                    <span>Start Racing</span>
                  </Button>
                </Link>
                <Link href="/races">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2">
                    View Races
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-border bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatsCounter
                value={15420}
                label="Total Races"
                icon={Flag}
              />
              <StatsCounter
                value={3250}
                label="Active Drivers"
                icon={Users}
              />
              <StatsCounter
                value={48}
                label="Championships"
                icon={Trophy}
              />
              <StatsCounter
                value={127}
                label="Track Records"
                suffix="+"
                icon={Timer}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to <span className="text-primary">Compete</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From booking your first race to competing for championship glory, 
                we have all the tools to fuel your racing journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  glow
                  className="group p-6 hover:border-primary/50 transition-all"
                >
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tier System Section */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Climb the <span className="text-primary">Ranks</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our skill-based tier system ensures fair competition and tracks your 
                progression from rookie to legend.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {tiers.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <TierBadge tier={item.tier} size="lg" showLabel={false} className="mb-3 mx-auto" />
                  <h4 className="font-bold capitalize mb-1">{item.tier.replace("-", " ")}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Races Preview */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Upcoming <span className="text-primary">Races</span>
                </h2>
                <p className="text-muted-foreground">
                  Jump into the action - spots fill up fast!
                </p>
              </div>
              <Link href="/races">
                <Button variant="outline" className="gap-2">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingRaces.map((race) => {
                const isFull = race.current_participants >= race.max_participants;
                const spotsLeft = race.max_participants - race.current_participants;
                
                return (
                  <Card key={race.id} glow className="group overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={isFull ? "warning" : "success"}>
                          {isFull ? "Full" : `${spotsLeft} spots left`}
                        </Badge>
                        <span className="font-bold">${race.entry_fee}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {race.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(race.scheduled_time).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {race.current_participants}/{race.max_participants}
                          </span>
                        </div>
                        <Link href={`/races/${race.id}`}>
                          <Button size="sm" variant={isFull ? "secondary" : "default"}>
                            {isFull ? "Waitlist" : "Book Now"}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Drivers Section */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Top <span className="text-primary">Drivers</span>
                </h2>
                <p className="text-muted-foreground">
                  The elite racers dominating the leaderboard
                </p>
              </div>
              <Link href="/leaderboard">
                <Button variant="outline" className="gap-2">
                  Full Leaderboard
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topDrivers.map((driver, index) => {
                const positionColors = ["text-gold", "text-silver", "text-bronze"];
                const bgColors = ["border-gold/30", "border-silver/30", "border-bronze/30"];
                
                return (
                  <Card
                    key={index}
                    glow
                    className={`group overflow-hidden border-l-4 ${bgColors[index]}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl font-bold ${positionColors[index]}`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold group-hover:text-primary transition-colors">
                            {driver.name}
                          </h3>
                          <TierBadge tier={driver.tier} size="sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-2xl font-bold text-gold">{driver.wins}</p>
                          <p className="text-xs text-muted-foreground uppercase">Wins</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold font-mono">
                            {driver.points.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">Points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Hit the <span className="text-primary">Track?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of racers competing for glory. Create your account 
                and book your first race today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="xl" skewed className="w-full sm:w-auto">
                    <span>Create Account</span>
                  </Button>
                </Link>
                <Link href="/races">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    Browse Races
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
