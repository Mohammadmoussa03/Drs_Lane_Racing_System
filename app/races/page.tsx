import { Metadata } from "next";
import { RaceFilters } from "@/components/races/race-filters";
import { RaceList } from "@/components/races/race-list";
import { RaceCalendar } from "@/components/races/race-calendar";

export const metadata: Metadata = {
  title: "Races | DRS Lane Racing",
  description: "Browse and book upcoming races. Choose from practice, qualifying, and Grand Prix sessions.",
};

export default function RacesPage() {
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
            UPCOMING <span className="text-primary">RACES</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Book your spot on the grid. From casual practice to intense Grand Prix action, 
            find your perfect race and start competing.
          </p>
        </div>
        <div className="racing-stripes h-1 absolute bottom-0 left-0 right-0" />
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters & Calendar */}
            <aside className="lg:col-span-1 space-y-6">
              <RaceFilters />
              <RaceCalendar />
            </aside>

            {/* Main Content - Race Listings */}
            <main className="lg:col-span-3">
              <RaceList />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
