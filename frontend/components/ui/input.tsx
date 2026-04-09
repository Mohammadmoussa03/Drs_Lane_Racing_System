'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'w-full px-4 py-2 bg-background border border-primary/30 rounded-md text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
