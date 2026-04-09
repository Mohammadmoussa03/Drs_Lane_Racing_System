"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  showValue?: boolean;
  animated?: boolean;
}

const variantClasses = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export function Progress({
  value = 0,
  max = 100,
  variant = "default",
  showValue = false,
  animated = false,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out",
            variantClasses[variant],
            animated && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="text-sm font-mono text-muted-foreground min-w-[3ch]">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
