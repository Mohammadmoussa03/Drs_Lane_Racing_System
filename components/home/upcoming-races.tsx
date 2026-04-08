import Link from "next/link";
import { ArrowRight, Calendar, Clock, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const upcomingRaces = [
  {
    id: 1,
    title: "Sunday Sprint Challenge",
    type: "Grand Prix",
    date: "Apr 13, 2026",
    time: "2:00 PM",
    track: "DRS Lane Main Circuit",
    spotsLeft: 4,
    maxDrivers: 12,
    price: 45,
    featured: true,
  },
  {
    id: 2,
    title: "Rookie Practice Session",
    type: "Practice",
    date: "Apr 14, 2026",
    time: "10:00 AM",
    track: "DRS Lane Main Circuit",
    spotsLeft: 8,
    maxDrivers: 12,
    price: 25,
    featured: false,
  },
  {
    id: 3,
    title: "Championship Qualifier",
    type: "Qualifying",
    date: "Apr 14, 2026",
    time: "4:00 PM",
    track: "DRS Lane Main Circuit",
    spotsLeft: 2,
    maxDrivers: 12,
    price: 55,
    featured: false,
  },
  {
    id: 4,
    title: "Evening Endurance Race",
    type: "Grand Prix",
    date: "Apr 15, 2026",
    time: "7:00 PM",
    track: "DRS Lane Main Circuit",
    spotsLeft: 6,
    maxDrivers: 12,
    price: 50,
    featured: false,
  },
];

function getRaceTypeColor(type: string) {
  switch (type) {
    case "Grand Prix":
      return "bg-primary text-primary-foreground";
    case "Qualifying":
      return "bg-gold/20 text-gold";
    case "Practice":
      return "bg-secondary text-foreground";
    default:
      return "bg-secondary text-foreground";
  }
}

export function UpcomingRaces() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
              UPCOMING RACES
            </h2>
            <p className="text-muted-foreground">
              Secure your spot on the grid. Limited spaces available.
            </p>
          </div>
          <Link
            href="/races"
            className="flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
          >
            View All Races
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Race Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingRaces.map((race) => (
            <Link
              key={race.id}
              href={`/races/${race.id}`}
              className={cn(
                "group relative bg-card rounded-sm border border-border p-5 hover:border-primary/50 transition-all card-glow",
                race.featured && "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-1"
              )}
            >
              {/* Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={cn(
                    "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm",
                    getRaceTypeColor(race.type)
                  )}
                >
                  {race.type}
                </span>
                {race.spotsLeft <= 3 && (
                  <span className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Zap className="w-3 h-3" />
                    Filling Fast
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {race.title}
              </h3>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {race.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {race.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {race.spotsLeft} of {race.maxDrivers} spots left
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${((race.maxDrivers - race.spotsLeft) / race.maxDrivers) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-foreground">${race.price}</span>
                  <span className="text-sm text-muted-foreground">/race</span>
                </div>
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Book Now
                </span>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/0 rounded-tr-sm group-hover:border-primary/50 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
