'use client'

import { PositionBadge } from './position-badge'
import { TierBadge } from './tier-badge'
import Link from 'next/link'

interface LeaderboardRowProps {
  position: number
  driver: any
  points: number
  races: number
  wins: number
}

export function LeaderboardRow({ position, driver, points, races, wins }: LeaderboardRowProps) {
  return (
    <Link href={`/drivers/${driver.id}`}>
      <div className="flex items-center justify-between p-4 bg-secondary border-b border-primary/20 hover:bg-secondary/80 transition-colors cursor-pointer">
        <div className="flex items-center gap-4 flex-1">
          <PositionBadge position={position} size="md" />
          <div className="flex-1">
            <p className="font-bold text-foreground">{driver.username}</p>
            <p className="text-sm text-muted">{driver.first_name} {driver.last_name}</p>
          </div>
          <div className="hidden md:block">
            <TierBadge tier={driver.tier} size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-6 ml-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-muted">Races</p>
            <p className="font-bold text-foreground">{races}</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-muted">Wins</p>
            <p className="font-bold text-foreground">{wins}</p>
          </div>
          <div className="text-right min-w-fit">
            <p className="text-xs text-muted">Points</p>
            <p className="font-bold text-accent text-lg">{points}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
