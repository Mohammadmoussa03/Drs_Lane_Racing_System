'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-primary text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-600 text-white',
      destructive: 'bg-red-600 text-white',
    }

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', variants[variant], className)}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'
