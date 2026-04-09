'use client'

import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface TierBadgeProps {
  tier: string
  size?: 'sm' | 'md' | 'lg'
}

export function TierBadge({ tier, size = 'md' }: TierBadgeProps) {
  const tierColors = {
    rookie: 'bg-blue-600',
    intermediate: 'bg-purple-600',
    pro: 'bg-orange-600',
    champion: 'bg-primary',
  }

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  const label = tier.charAt(0).toUpperCase() + tier.slice(1)

  return (
    <div className={cn('inline-flex items-center rounded-full font-bold text-white', tierColors[tier as keyof typeof tierColors] || tierColors.rookie, sizeStyles[size])}>
      {label}
    </div>
  )
}
