import Link from "next/link";
import { Trophy, Calendar, Users, Flag, ArrowRight } from "lucide-react";

export function ChampionshipHero() {
  return (
    <section className="relative py-20 bg-card border-b border-border overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="checkered-flag w-full h-full" />
      </div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Season 2026 Championship</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            COMPETE FOR
            <br />
            <span className="text-primary">CHAMPIONSHIP GLORY</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Join the elite ranks of DRS Lane Racing champions. Compete across multiple races, 
            accumulate points, and prove {"you're"} the fastest driver on the grid.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-bold">8</span> Race Events
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-bold">42</span> Registered Drivers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-bold">Apr - Nov</span> Duration
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="text-sm text-muted-foreground">
                <span className="text-gold font-bold">$5,000</span> Prize Pool
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/championships/register"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-sm transform -skew-x-3 hover:skew-x-0 transition-all"
            >
              <span className="inline-block transform skew-x-3 group-hover:skew-x-0 transition-transform">
                Register Now
              </span>
              <ArrowRight className="w-5 h-5 transform skew-x-3 group-hover:skew-x-0 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="#standings"
              className="px-8 py-4 text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              View Standings
            </Link>
          </div>
        </div>
      </div>

      <div className="racing-stripes h-1 absolute bottom-0 left-0 right-0" />
    </section>
  );
}
