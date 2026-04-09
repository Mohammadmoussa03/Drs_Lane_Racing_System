'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TierBadge } from './tier-badge'
import Link from 'next/link'
import { User } from '@/lib/types'

interface DriverCardProps {
  driver: User
  stats?: {
    wins: number
    podiums: number
    races: number
  }
}

export function DriverCard({ driver, stats }: DriverCardProps) {
  return (
    <Link href={`/drivers/${driver.id}`}>
      <Card className="hover:border-primary/50 transition-all cursor-pointer">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{driver.username.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{driver.username}</h3>
              <p className="text-sm text-muted">{driver.first_name} {driver.last_name}</p>
            </div>
            <div className="flex justify-center">
              <TierBadge tier={driver.tier} size="md" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-primary/20">
              <div>
                <p className="text-xs text-muted">Points</p>
                <p className="font-bold text-foreground">{driver.points}</p>
              </div>
              {stats && (
                <>
                  <div>
                    <p className="text-xs text-muted">Wins</p>
                    <p className="font-bold text-foreground">{stats.wins}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Podiums</p>
                    <p className="font-bold text-foreground">{stats.podiums}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
