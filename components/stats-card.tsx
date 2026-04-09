"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "gold" | "red"
  className?: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30",
        className
      )}
    >
      {/* Background accent */}
      <div
        className={cn(
          "absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl opacity-10",
          variant === "gold" && "bg-primary",
          variant === "red" && "bg-racing-red",
          variant === "default" && "bg-muted-foreground"
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p
              className={cn(
                "text-3xl font-bold tracking-tight",
                variant === "gold" && "text-gold",
                variant === "red" && "text-racing-red",
                variant === "default" && "text-foreground"
              )}
            >
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              variant === "gold" && "bg-primary/10 text-primary",
              variant === "red" && "bg-racing-red/10 text-racing-red",
              variant === "default" && "bg-muted text-muted-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>

        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
                trend.value >= 0
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-red-500/10 text-red-500"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
