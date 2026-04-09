"use client"

import { Flag, Timer, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiveRace {
  id: number
  title: string
  lap: number
  totalLaps: number
  leader: string
  fastestLap: string
}

interface LiveTickerProps {
  races: LiveRace[]
  className?: string
}

export function LiveTicker({ races, className }: LiveTickerProps) {
  if (races.length === 0) return null

  return (
    <div className={cn("relative overflow-hidden border-y border-border bg-card/50", className)}>
      <div className="flex items-center">
        {/* Live indicator */}
        <div className="flex items-center gap-2 px-4 py-3 bg-racing-red text-white shrink-0">
          <span className="h-2 w-2 rounded-full bg-white pulse-live" />
          <span className="text-sm font-bold uppercase tracking-wider">Live</span>
        </div>

        {/* Scrolling content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-marquee gap-8 py-3 px-4">
            {[...races, ...races].map((race, index) => (
              <div
                key={`${race.id}-${index}`}
                className="flex items-center gap-6 shrink-0"
              >
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground whitespace-nowrap">
                    {race.title}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Timer className="h-3.5 w-3.5" />
                  <span className="text-sm whitespace-nowrap">
                    Lap {race.lap}/{race.totalLaps}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Leader:</span>
                  <span className="text-sm font-medium text-gold whitespace-nowrap">
                    {race.leader}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm font-mono text-primary whitespace-nowrap">
                    {race.fastestLap}
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
