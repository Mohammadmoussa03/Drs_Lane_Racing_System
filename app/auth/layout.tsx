'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Racing stripe background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* F1-style top accent */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="h-1 flex-1 bg-gradient-to-r from-accent to-transparent"></div>
          <h1 className="text-2xl font-bold text-foreground tracking-wider">DRS LANE</h1>
          <div className="h-1 flex-1 bg-gradient-to-l from-accent to-transparent"></div>
        </div>

        {children}
      </div>
    </div>
  )
}
