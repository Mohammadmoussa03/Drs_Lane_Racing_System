'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer'
    const variants = {
      default: 'bg-primary text-white hover:bg-primary/90 skew-button',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-primary text-primary hover:bg-primary/10',
      ghost: 'hover:bg-secondary',
    }
    const sizes = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
