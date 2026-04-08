import { Metadata } from "next";
import { DriversGrid } from "@/components/drivers/drivers-grid";

export const metadata: Metadata = {
  title: "Drivers | DRS Lane Racing",
  description: "Meet the drivers of DRS Lane Racing. View profiles, stats, and achievements.",
};

export default function DriversPage() {
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
            MEET THE <span className="text-primary">DRIVERS</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover the talented drivers competing at DRS Lane Racing. 
            From rising rookies to seasoned champions.
          </p>
        </div>
        <div className="racing-stripes h-1 absolute bottom-0 left-0 right-0" />
      </section>

      {/* Drivers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <DriversGrid />
        </div>
      </section>
    </div>
  );
}
