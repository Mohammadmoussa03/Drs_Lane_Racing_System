"use client"

import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Driver {
  id: number
  position: number
  previousPosition?: number
  nickname: string
  avatar?: string
  tier: "Bronze" | "Silver" | "Gold" | "Elite"
  totalPoints: number
  wins: number
  podiums: number
  fastestLaps: number
  totalRaces: number
}

interface LeaderboardTableProps {
  drivers: Driver[]
  compact?: boolean
  className?: string
}

const tierColors = {
  Bronze: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Silver: "bg-slate-400/10 text-slate-400 border-slate-400/20",
  Gold: "bg-primary/10 text-primary border-primary/20",
  Elite: "bg-racing-red/10 text-racing-red border-racing-red/20",
}

const positionIcons = {
  1: Trophy,
  2: Medal,
  3: Award,
}

export function LeaderboardTable({
  drivers,
  compact = false,
  className,
}: LeaderboardTableProps) {
  const getPositionChange = (current: number, previous?: number) => {
    if (!previous) return null
    const change = previous - current
    if (change > 0) return { direction: "up", value: change }
    if (change < 0) return { direction: "down", value: Math.abs(change) }
    return { direction: "same", value: 0 }
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pos
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Driver
              </th>
              {!compact && (
                <>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tier
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Races
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Wins
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Podiums
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    FL
                  </th>
                </>
              )}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {drivers.map((driver) => {
              const PositionIcon = positionIcons[driver.position as keyof typeof positionIcons]
              const change = getPositionChange(driver.position, driver.previousPosition)

              return (
                <tr
                  key={driver.id}
                  className={cn(
                    "transition-colors hover:bg-muted/20",
                    driver.position <= 3 && "bg-muted/10"
                  )}
                >
                  {/* Position */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {PositionIcon ? (
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            driver.position === 1 && "bg-primary/20 text-primary",
                            driver.position === 2 && "bg-slate-400/20 text-slate-400",
                            driver.position === 3 && "bg-orange-500/20 text-orange-500"
                          )}
                        >
                          <PositionIcon className="h-4 w-4" />
                        </div>
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center text-lg font-bold text-muted-foreground">
                          {driver.position}
                        </span>
                      )}
                      {change && !compact && (
                        <div className="flex items-center">
                          {change.direction === "up" && (
                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                          )}
                          {change.direction === "down" && (
                            <TrendingDown className="h-3 w-3 text-racing-red" />
                          )}
                          {change.direction === "same" && (
                            <Minus className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Driver */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-border">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback className="bg-muted text-foreground font-semibold">
                          {driver.nickname.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-foreground">
                        {driver.nickname}
                      </span>
                    </div>
                  </td>

                  {!compact && (
                    <>
                      {/* Tier */}
                      <td className="px-4 py-4 text-center">
                        <Badge
                          variant="outline"
                          className={cn("font-medium", tierColors[driver.tier])}
                        >
                          {driver.tier}
                        </Badge>
                      </td>

                      {/* Races */}
                      <td className="px-4 py-4 text-center text-muted-foreground">
                        {driver.totalRaces}
                      </td>

                      {/* Wins */}
                      <td className="px-4 py-4 text-center font-semibold text-foreground">
                        {driver.wins}
                      </td>

                      {/* Podiums */}
                      <td className="px-4 py-4 text-center text-muted-foreground">
                        {driver.podiums}
                      </td>

                      {/* Fastest Laps */}
                      <td className="px-4 py-4 text-center">
                        <span className="text-primary">{driver.fastestLaps}</span>
                      </td>
                    </>
                  )}

                  {/* Points */}
                  <td className="px-4 py-4 text-right">
                    <span
                      className={cn(
                        "text-lg font-bold",
                        driver.position <= 3 ? "text-gold" : "text-foreground"
                      )}
                    >
                      {driver.totalPoints}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
