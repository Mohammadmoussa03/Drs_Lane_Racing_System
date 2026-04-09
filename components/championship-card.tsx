"use client"

import { Trophy, Calendar, Users, Flag, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ChampionshipCardProps {
  name: string
  season: number
  description: string
  status: "Upcoming" | "Active" | "Completed"
  startsAt: string
  endsAt: string
  maxDrivers: number
  currentDrivers: number
  totalRaces: number
  completedRaces: number
  leader?: {
    nickname: string
    points: number
  }
  isFeatured?: boolean
  className?: string
}

const statusColors = {
  Upcoming: "bg-blue-500/10 text-blue-500",
  Active: "bg-emerald-500/10 text-emerald-500",
  Completed: "bg-muted text-muted-foreground",
}

export function ChampionshipCard({
  name,
  season,
  description,
  status,
  startsAt,
  endsAt,
  maxDrivers,
  currentDrivers,
  totalRaces,
  completedRaces,
  leader,
  isFeatured,
  className,
}: ChampionshipCardProps) {
  const progress = totalRaces > 0 ? (completedRaces / totalRaces) * 100 : 0
  const startDate = new Date(startsAt)
  const endDate = new Date(endsAt)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30",
        isFeatured && "border-primary/50 ring-1 ring-primary/20",
        className
      )}
    >
      {/* Header with gradient */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-racing-red/10" />
        <div className="absolute inset-0 bg-carbon-fiber opacity-30" />
        
        {/* Trophy icon */}
        <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-background/50 backdrop-blur-sm">
          <Trophy className="h-8 w-8 text-gold" />
        </div>

        <div className="absolute bottom-4 left-6">
          <Badge className={cn("mb-2", statusColors[status])}>
            {status === "Active" && (
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current pulse-live inline-block" />
            )}
            {status}
          </Badge>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">Season {season}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description || "Compete in this championship to earn points and climb the leaderboard."}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Calendar className="h-3.5 w-3.5" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
            <p className="text-xs text-muted-foreground">Start</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Flag className="h-3.5 w-3.5" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {completedRaces}/{totalRaces}
            </p>
            <p className="text-xs text-muted-foreground">Races</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Users className="h-3.5 w-3.5" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {currentDrivers}/{maxDrivers}
            </p>
            <p className="text-xs text-muted-foreground">Drivers</p>
          </div>
        </div>

        {/* Progress */}
        {status !== "Upcoming" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Championship Progress</span>
              <span className="font-medium text-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Leader */}
        {leader && status !== "Upcoming" && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-gold" />
              <span className="text-sm text-muted-foreground">Leader</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{leader.nickname}</p>
              <p className="text-xs text-gold">{leader.points} pts</p>
            </div>
          </div>
        )}

        {/* Action button */}
        <Button
          className={cn(
            "w-full gap-2 group/btn",
            status === "Upcoming" && "gradient-gold text-background hover:opacity-90"
          )}
          variant={status === "Upcoming" ? "default" : "secondary"}
        >
          {status === "Upcoming" ? "Register Now" : status === "Active" ? "View Standings" : "View Results"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
