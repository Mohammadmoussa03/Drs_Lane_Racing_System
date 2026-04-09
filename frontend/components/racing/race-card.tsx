'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { formatDate } from '@/lib/auth'
import { Race } from '@/lib/types'

interface RaceCardProps {
  race: Race
}

export function RaceCard({ race }: RaceCardProps) {
  const statusColors = {
    upcoming: 'bg-blue-600',
    ongoing: 'bg-yellow-600',
    completed: 'bg-green-600',
  }

  const spotsAvailable = race.max_participants - race.current_participants

  return (
    <Link href={`/races/${race.id}`}>
      <Card className="hover:border-primary/50 transition-all cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{race.name}</h3>
              <p className="text-sm text-muted mt-1">{race.track_name}</p>
            </div>
            <Badge variant={race.status === 'upcoming' ? 'default' : race.status === 'ongoing' ? 'warning' : 'success'}>
              {race.status.charAt(0).toUpperCase() + race.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-foreground line-clamp-2">{race.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted">Date</p>
                <p className="text-foreground font-medium">{formatDate(race.scheduled_date)}</p>
              </div>
              <div>
                <p className="text-muted">Format</p>
                <p className="text-foreground font-medium">{race.format}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-primary/20 flex items-center justify-between">
              <span className="text-sm text-muted">
                {race.current_participants}/{race.max_participants} Drivers
              </span>
              <span className="text-sm font-bold text-accent">{spotsAvailable} Spots Left</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
