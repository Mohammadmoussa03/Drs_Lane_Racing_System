'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bg-secondary border border-primary/20 rounded-lg', className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 border-b border-primary/20', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6', className)} {...props} />
)
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 border-t border-primary/20', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'
