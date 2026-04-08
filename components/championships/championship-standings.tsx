import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const standings = [
  { position: 1, driver: "VELOCITY_X", points: 187, gap: "-", trend: "=" },
  { position: 2, driver: "APEX_HUNTER", points: 156, gap: "31", trend: "up" },
  { position: 3, driver: "DRIFT_KING", points: 142, gap: "45", trend: "down" },
  { position: 4, driver: "TURBO_RACER", points: 128, gap: "59", trend: "up" },
  { position: 5, driver: "NITRO_BLAZE", points: 115, gap: "72", trend: "=" },
];

const raceResults = [
  { round: 1, name: "Opening Sprint", winner: "VELOCITY_X", completed: true },
  { round: 2, name: "Night Challenge", winner: "APEX_HUNTER", completed: true },
  { round: 3, name: "Endurance Race", winner: "VELOCITY_X", completed: true },
  { round: 4, name: "Qualifier Special", winner: "DRIFT_KING", completed: true },
  { round: 5, name: "Mid-Season GP", winner: null, completed: false },
  { round: 6, name: "Summer Showdown", winner: null, completed: false },
  { round: 7, name: "Championship Heat", winner: null, completed: false },
  { round: 8, name: "Season Finale", winner: null, completed: false },
];

function getPositionColor(position: number) {
  switch (position) {
    case 1:
      return "text-gold";
    case 2:
      return "text-silver";
    case 3:
      return "text-bronze";
    default:
      return "text-muted-foreground";
  }
}

export function ChampionshipStandings() {
  return (
    <section id="standings" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
              2026 CHAMPIONSHIP <span className="text-primary">STANDINGS</span>
            </h2>
            <p className="text-muted-foreground">
              Current standings after 4 of 8 rounds
            </p>
          </div>
          <Link
            href="/championships/standings"
            className="flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
          >
            Full Standings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Standings Table */}
          <div className="lg:col-span-2 bg-card border border-border rounded-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-secondary/30">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-gold" />
                Driver Standings
              </h3>
            </div>
            <div className="divide-y divide-border">
              {standings.map((entry) => (
                <Link
                  key={entry.position}
                  href={`/drivers/${entry.driver.toLowerCase()}`}
                  className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors group"
                >
                  {/* Position */}
                  <span className={cn(
                    "w-8 text-2xl font-bold",
                    getPositionColor(entry.position)
                  )}>
                    {entry.position}
                  </span>

                  {/* Driver */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center">
                      <span className="font-bold text-muted-foreground">
                        {entry.driver.charAt(0)}
                      </span>
                    </div>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {entry.driver}
                    </span>
                  </div>

                  {/* Gap */}
                  <div className="text-right hidden sm:block">
                    <span className="text-sm text-muted-foreground">
                      {entry.gap === "-" ? "-" : `+${entry.gap}`}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="text-right min-w-[60px]">
                    <span className="text-xl font-bold text-primary">
                      {entry.points}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">PTS</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Race Calendar */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-secondary/30">
              <h3 className="font-bold text-foreground">Race Calendar</h3>
            </div>
            <div className="divide-y divide-border">
              {raceResults.map((race) => (
                <div
                  key={race.round}
                  className={cn(
                    "flex items-center gap-3 p-4",
                    race.completed ? "opacity-100" : "opacity-50"
                  )}
                >
                  {/* Round Number */}
                  <span className={cn(
                    "w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold",
                    race.completed 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                  )}>
                    R{race.round}
                  </span>

                  {/* Race Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm truncate">
                      {race.name}
                    </div>
                    {race.winner ? (
                      <div className="text-xs text-gold flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {race.winner}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Upcoming
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  {race.completed && (
                    <span className="text-xs text-green-500 font-medium">
                      Complete
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
