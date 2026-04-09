import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LiveTicker } from "@/components/live-ticker"
import { StatsCard } from "@/components/stats-card"
import { RaceCard } from "@/components/race-card"
import { ChampionshipCard } from "@/components/championship-card"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { Footer } from "@/components/footer"
import { 
  Flag, 
  Trophy, 
  Timer, 
  Zap, 
  ArrowRight,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data
const liveRaces = [
  { id: 1, title: "Grand Prix Finals", lap: 12, totalLaps: 15, leader: "SpeedDemon", fastestLap: "1:23.456" },
  { id: 2, title: "Evening Sprint", lap: 8, totalLaps: 10, leader: "NightRider", fastestLap: "1:24.112" },
]

const upcomingRaces = [
  {
    id: 1,
    title: "Saturday Night Showdown",
    type: "Grand Prix" as const,
    skillLevel: "Advanced",
    scheduledAt: "2026-04-11T19:00:00",
    duration: 30,
    maxDrivers: 12,
    bookedCount: 10,
    trackName: "DRS Lane Main Circuit",
    price: 45,
    status: "Open" as const,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Morning Practice",
    type: "Practice" as const,
    skillLevel: "All Levels",
    scheduledAt: "2026-04-10T09:00:00",
    duration: 15,
    maxDrivers: 8,
    bookedCount: 5,
    trackName: "DRS Lane Training Track",
    price: 0,
    status: "Open" as const,
  },
  {
    id: 3,
    title: "Qualifier Round 5",
    type: "Qualifying" as const,
    skillLevel: "Intermediate",
    scheduledAt: "2026-04-10T14:00:00",
    duration: 20,
    maxDrivers: 10,
    bookedCount: 10,
    trackName: "DRS Lane Main Circuit",
    price: 25,
    status: "Full" as const,
  },
  {
    id: 4,
    title: "Elite Championship Heat",
    type: "Grand Prix" as const,
    skillLevel: "Elite",
    scheduledAt: "2026-04-12T18:00:00",
    duration: 45,
    maxDrivers: 12,
    bookedCount: 8,
    trackName: "DRS Lane Pro Circuit",
    price: 75,
    status: "Open" as const,
  },
]

const championships = [
  {
    id: 1,
    name: "Spring Championship 2026",
    season: 2026,
    description: "The ultimate test of speed and skill. 8 races, one champion.",
    status: "Active" as const,
    startsAt: "2026-03-01",
    endsAt: "2026-05-31",
    maxDrivers: 50,
    currentDrivers: 42,
    totalRaces: 8,
    completedRaces: 4,
    leader: { nickname: "SpeedDemon", points: 186 },
    isFeatured: true,
  },
  {
    id: 2,
    name: "Summer Series",
    season: 2026,
    description: "Heat up your summer with intense racing action.",
    status: "Upcoming" as const,
    startsAt: "2026-06-01",
    endsAt: "2026-08-31",
    maxDrivers: 60,
    currentDrivers: 23,
    totalRaces: 10,
    completedRaces: 0,
  },
]

const topDrivers = [
  { id: 1, position: 1, previousPosition: 1, nickname: "SpeedDemon", tier: "Elite" as const, totalPoints: 2450, wins: 15, podiums: 28, fastestLaps: 12, totalRaces: 45 },
  { id: 2, position: 2, previousPosition: 3, nickname: "RacerX", tier: "Elite" as const, totalPoints: 2280, wins: 12, podiums: 24, fastestLaps: 8, totalRaces: 42 },
  { id: 3, position: 3, previousPosition: 2, nickname: "NightRider", tier: "Gold" as const, totalPoints: 2150, wins: 10, podiums: 22, fastestLaps: 15, totalRaces: 40 },
  { id: 4, position: 4, previousPosition: 4, nickname: "ThunderBolt", tier: "Gold" as const, totalPoints: 1980, wins: 8, podiums: 18, fastestLaps: 6, totalRaces: 38 },
  { id: 5, position: 5, previousPosition: 6, nickname: "ShadowRacer", tier: "Gold" as const, totalPoints: 1820, wins: 6, podiums: 16, fastestLaps: 4, totalRaces: 35 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Live ticker */}
      <div className="pt-16">
        <LiveTicker races={liveRaces} />
      </div>

      {/* Hero */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatsCard
              title="Total Races"
              value="1,247"
              subtitle="This Season"
              icon={Flag}
              trend={{ value: 12, label: "vs last month" }}
              variant="gold"
            />
            <StatsCard
              title="Active Drivers"
              value="528"
              subtitle="Registered"
              icon={Trophy}
              trend={{ value: 8, label: "new this week" }}
            />
            <StatsCard
              title="Track Record"
              value="1:21.892"
              subtitle="Main Circuit"
              icon={Timer}
              variant="red"
            />
            <StatsCard
              title="Races Today"
              value="8"
              subtitle="2 in progress"
              icon={Zap}
            />
          </div>
        </div>
      </section>

      {/* Upcoming Races */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Upcoming Races</h2>
              <p className="mt-1 text-muted-foreground">Book your spot on the grid</p>
            </div>
            <Link href="/races">
              <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/10">
                View All Races
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {upcomingRaces.map((race) => (
              <RaceCard key={race.id} {...race} />
            ))}
          </div>
        </div>
      </section>

      {/* Championships */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Championships</h2>
              <p className="mt-1 text-muted-foreground">Compete for the ultimate glory</p>
            </div>
            <Link href="/championships">
              <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/10">
                All Championships
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {championships.map((championship) => (
              <ChampionshipCard key={championship.id} {...championship} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Top Drivers</h2>
              <p className="mt-1 text-muted-foreground">Season leaderboard standings</p>
            </div>
            <Link href="/leaderboard">
              <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/10">
                Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <LeaderboardTable drivers={topDrivers} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-racing-red/5" />
        <div className="absolute inset-0 bg-carbon-fiber opacity-20" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">New Season Starting Soon</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Hit the Track?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of drivers competing at DRS Lane Racing. Whether you&apos;re a beginner or a seasoned pro, 
            there&apos;s a race waiting for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-gold text-background font-semibold hover:opacity-90 gap-2">
              <Zap className="h-5 w-5" />
              Book Your First Race
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
