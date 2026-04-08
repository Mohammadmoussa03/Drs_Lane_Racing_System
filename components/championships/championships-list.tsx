import Link from "next/link";
import { Trophy, Calendar, Users, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const championships = [
  {
    id: 1,
    name: "2026 Grand Prix Championship",
    season: 2026,
    status: "Active",
    description: "The premier championship series at DRS Lane Racing. Compete across 8 races for ultimate glory.",
    startDate: "Apr 1, 2026",
    endDate: "Nov 30, 2026",
    totalRaces: 8,
    completedRaces: 4,
    maxDrivers: 50,
    registeredDrivers: 42,
    prizePool: "$5,000",
  },
  {
    id: 2,
    name: "Rookie Championship",
    season: 2026,
    status: "Active",
    description: "Perfect for newcomers. Build experience and compete against drivers at your skill level.",
    startDate: "Apr 15, 2026",
    endDate: "Oct 15, 2026",
    totalRaces: 6,
    completedRaces: 2,
    maxDrivers: 30,
    registeredDrivers: 28,
    prizePool: "$1,500",
  },
  {
    id: 3,
    name: "Summer Sprint Series",
    season: 2026,
    status: "Upcoming",
    description: "Fast-paced sprint races throughout the summer months. Short races, big competition.",
    startDate: "Jun 1, 2026",
    endDate: "Aug 31, 2026",
    totalRaces: 10,
    completedRaces: 0,
    maxDrivers: 40,
    registeredDrivers: 15,
    prizePool: "$2,500",
  },
  {
    id: 4,
    name: "2025 Grand Prix Championship",
    season: 2025,
    status: "Completed",
    description: "Last {"season's"} championship. VELOCITY_X claimed the title in a thrilling finale.",
    startDate: "Apr 1, 2025",
    endDate: "Nov 30, 2025",
    totalRaces: 8,
    completedRaces: 8,
    maxDrivers: 50,
    registeredDrivers: 48,
    prizePool: "$5,000",
    champion: "VELOCITY_X",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-500/10 text-green-500 border-green-500/30";
    case "Upcoming":
      return "bg-blue-500/10 text-blue-500 border-blue-500/30";
    case "Completed":
      return "bg-secondary text-muted-foreground border-border";
    default:
      return "bg-secondary text-muted-foreground border-border";
  }
}

export function ChampionshipsList() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
            ALL <span className="text-primary">CHAMPIONSHIPS</span>
          </h2>
          <p className="text-muted-foreground">
            Browse current, upcoming, and past championship series
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {championships.map((championship) => (
            <Link
              key={championship.id}
              href={`/championships/${championship.id}`}
              className="group bg-background border border-border rounded-sm p-6 hover:border-primary/50 transition-all card-glow"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className={cn(
                    "inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm border mb-2",
                    getStatusBadge(championship.status)
                  )}>
                    {championship.status}
                  </span>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {championship.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-gold">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {championship.description}
              </p>

              {/* Champion Badge (if completed) */}
              {championship.champion && (
                <div className="flex items-center gap-2 px-3 py-2 bg-gold/10 border border-gold/30 rounded-sm mb-4">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium text-gold">
                    Champion: {championship.champion}
                  </span>
                </div>
              )}

              {/* Progress (if active) */}
              {championship.status === "Active" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">
                      {championship.completedRaces} / {championship.totalRaces} races
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(championship.completedRaces / championship.totalRaces) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-secondary/50 rounded-sm">
                  <Calendar className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <div className="text-xs text-muted-foreground">Races</div>
                  <div className="font-bold text-foreground">{championship.totalRaces}</div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-sm">
                  <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <div className="text-xs text-muted-foreground">Drivers</div>
                  <div className="font-bold text-foreground">
                    {championship.registeredDrivers}/{championship.maxDrivers}
                  </div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-sm">
                  <Trophy className="w-4 h-4 mx-auto text-gold mb-1" />
                  <div className="text-xs text-muted-foreground">Prize</div>
                  <div className="font-bold text-gold">{championship.prizePool}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {championship.startDate} - {championship.endDate}
                </div>
                <span className="flex items-center gap-1 text-sm text-primary font-medium group-hover:underline">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
