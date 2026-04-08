import Link from "next/link";
import { ArrowRight, Trophy, Calendar, Users, Flag } from "lucide-react";

export function ChampionshipBanner() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="checkered-flag w-full h-full" />
      </div>
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-sm p-8 md:p-12 relative overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary" />
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Championship Series</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                  2026 GRAND PRIX
                  <br />
                  <span className="text-primary">CHAMPIONSHIP</span>
                </h2>
                
                <p className="text-muted-foreground mb-6 max-w-xl text-pretty">
                  Compete against the best drivers across multiple races. Accumulate points, 
                  climb the standings, and fight for the championship crown.
                </p>

                {/* Championship Stats */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">8</span> Race Events
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">50</span> Max Drivers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Apr - Nov</span> Season
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Link
                    href="/championships"
                    className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-sm transform -skew-x-3 hover:skew-x-0 transition-all"
                  >
                    <span className="inline-block transform skew-x-3 group-hover:skew-x-0 transition-transform">
                      Enter Championship
                    </span>
                    <ArrowRight className="w-5 h-5 transform skew-x-3 group-hover:skew-x-0 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link
                    href="/championships/standings"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    View Current Standings
                  </Link>
                </div>
              </div>

              {/* Trophy Visual */}
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center border border-gold/20">
                  <div className="w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                    <Trophy className="w-16 h-16 md:w-24 md:h-24 text-gold" />
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
