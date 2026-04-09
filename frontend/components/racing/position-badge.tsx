'use client'

import { cn } from '@/lib/utils'

interface PositionBadgeProps {
  position: number
  size?: 'sm' | 'md' | 'lg'
}

export function PositionBadge({ position, size = 'md' }: PositionBadgeProps) {
  const getPodiumColor = (pos: number) => {
    switch (pos) {
      case 1:
        return 'bg-yellow-500'
      case 2:
        return 'bg-gray-400'
      case 3:
        return 'bg-orange-600'
      default:
        return 'bg-secondary border border-primary/30'
    }
  }

  const sizeStyles = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }

  const textColor = position <= 3 ? 'text-black' : 'text-foreground'

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-bold corner-bracket',
        getPodiumColor(position),
        sizeStyles[size],
        textColor
      )}
    >
      {position}
    </div>
  )
}
