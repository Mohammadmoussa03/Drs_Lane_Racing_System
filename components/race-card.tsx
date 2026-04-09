"use client"

import { Calendar, Clock, Users, MapPin, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RaceCardProps {
  title: string
  type: "Practice" | "Qualifying" | "Grand Prix"
  skillLevel: string
  scheduledAt: string
  duration: number
  maxDrivers: number
  bookedCount: number
  trackName: string
  price: number
  status: "Open" | "Full" | "In Progress" | "Completed"
  isFeatured?: boolean
  className?: string
}

const typeColors = {
  Practice: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Qualifying: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "Grand Prix": "bg-racing-red/10 text-racing-red border-racing-red/20",
}

const statusColors = {
  Open: "bg-emerald-500/10 text-emerald-500",
  Full: "bg-yellow-500/10 text-yellow-500",
  "In Progress": "bg-primary/10 text-primary",
  Completed: "bg-muted text-muted-foreground",
}

export function RaceCard({
  title,
  type,
  skillLevel,
  scheduledAt,
  duration,
  maxDrivers,
  bookedCount,
  trackName,
  price,
  status,
  isFeatured,
  className,
}: RaceCardProps) {
  const spotsLeft = maxDrivers - bookedCount
  const date = new Date(scheduledAt)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30",
        isFeatured && "border-primary/50",
        className
      )}
    >
      {/* Featured indicator */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-1 gradient-gold" />
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={cn("font-medium", typeColors[type])}
              >
                {type}
              </Badge>
              <Badge variant="secondary" className="font-medium">
                {skillLevel}
              </Badge>
              {status === "In Progress" && (
                <Badge className="bg-primary/10 text-primary font-medium">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary pulse-live inline-block" />
                  LIVE
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          <Badge className={cn("shrink-0", statusColors[status])}>
            {status}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}{" "}
              · {duration}min
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{trackName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span
              className={cn(
                spotsLeft <= 3 && spotsLeft > 0
                  ? "text-yellow-500"
                  : spotsLeft === 0
                  ? "text-racing-red"
                  : "text-muted-foreground"
              )}
            >
              {bookedCount}/{maxDrivers} drivers
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
          <div>
            {price > 0 ? (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gold">${price}</span>
                <span className="text-sm text-muted-foreground">/entry</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-emerald-500">FREE</span>
            )}
          </div>
          <Button
            disabled={status === "Full" || status === "Completed"}
            className={cn(
              "gap-2",
              status === "Open" && "gradient-gold text-background hover:opacity-90"
            )}
            variant={status === "Open" ? "default" : "secondary"}
          >
            {status === "Open" && <Zap className="h-4 w-4" />}
            {status === "Open"
              ? "Book Now"
              : status === "Full"
              ? "Join Waitlist"
              : status === "In Progress"
              ? "View Live"
              : "View Results"}
          </Button>
        </div>
      </div>
    </div>
  )
}
