"use client"

import { Flag, Zap, Trophy, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-carbon-fiber opacity-20" />
      
      {/* Animated racing lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent racing-stripe" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-racing-red/30 to-transparent racing-stripe" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent racing-stripe" style={{ animationDelay: "1s" }} />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-racing-red/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <span className="h-2 w-2 rounded-full bg-primary pulse-live" />
              <span className="text-sm font-medium text-primary">2 Races Live Now</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                <span className="text-foreground">Experience</span>
                <br />
                <span className="text-gold">Premium Racing</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Join the elite at DRS Lane Racing. Book sessions, compete in championships, and track your performance with our state-of-the-art timing system.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-gold text-background font-semibold hover:opacity-90 gap-2">
                <Zap className="h-5 w-5" />
                Book a Race
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary gap-2">
                <Trophy className="h-5 w-5" />
                View Championships
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-gold">500+</p>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">1,200+</p>
                <p className="text-sm text-muted-foreground">Races Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">15</p>
                <p className="text-sm text-muted-foreground">Championships</p>
              </div>
            </div>
          </div>

          {/* Visual element - Racing dashboard preview */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold">
                    <Flag className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Grand Prix Finals</p>
                    <p className="text-sm text-muted-foreground">Main Circuit</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-current pulse-live" />
                  LIVE
                </div>
              </div>

              {/* Leaderboard preview */}
              <div className="space-y-3">
                {[
                  { pos: 1, name: "SpeedDemon", time: "1:23.456", gap: "-" },
                  { pos: 2, name: "RacerX", time: "1:23.892", gap: "+0.436" },
                  { pos: 3, name: "NightRider", time: "1:24.103", gap: "+0.647" },
                ].map((driver) => (
                  <div
                    key={driver.pos}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      driver.pos === 1
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm ${
                          driver.pos === 1
                            ? "bg-primary text-background"
                            : driver.pos === 2
                            ? "bg-slate-400/20 text-slate-400"
                            : "bg-orange-500/20 text-orange-500"
                        }`}
                      >
                        P{driver.pos}
                      </span>
                      <span className="font-medium text-foreground">{driver.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-foreground">{driver.time}</p>
                      <p className="font-mono text-xs text-muted-foreground">{driver.gap}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm">Lap 12/15</span>
                </div>
                <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                  Watch Live
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-racing-red/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
