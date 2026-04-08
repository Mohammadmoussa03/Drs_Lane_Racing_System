import { Metadata } from "next";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardStats } from "@/components/leaderboard/leaderboard-stats";
import { TopThreePodium } from "@/components/leaderboard/top-three-podium";

export const metadata: Metadata = {
  title: "Leaderboard | DRS Lane Racing",
  description: "View the top drivers, race statistics, and championship standings at DRS Lane Racing.",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative py-16 bg-card border-b border-border overflow-hidden">
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
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            DRIVER <span className="text-primary">STANDINGS</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Track the top performers at DRS Lane Racing. Climb the ranks, 
            earn achievements, and cement your legacy.
          </p>
        </div>
        <div className="racing-stripes h-1 absolute bottom-0 left-0 right-0" />
      </section>

      {/* Stats Overview */}
      <LeaderboardStats />

      {/* Top 3 Podium */}
      <TopThreePodium />

      {/* Full Leaderboard */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <LeaderboardTable />
        </div>
      </section>
    </div>
  );
}
