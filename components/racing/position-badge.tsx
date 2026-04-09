import { cn } from "@/lib/utils";
import { getOrdinalSuffix } from "@/lib/utils";

interface PositionBadgeProps {
  position: number;
  size?: "sm" | "md" | "lg";
  showChange?: boolean;
  change?: number;
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
};

export function PositionBadge({
  position,
  size = "md",
  showChange = false,
  change = 0,
  className,
}: PositionBadgeProps) {
  const isPodium = position <= 3;

  const getPositionStyle = () => {
    if (position === 1) return "bg-gold text-black";
    if (position === 2) return "bg-silver text-black";
    if (position === 3) return "bg-bronze text-black";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center font-bold",
          isPodium ? "rounded-full" : "",
          sizeClasses[size],
          getPositionStyle()
        )}
      >
        {position}
      </div>
      {showChange && change !== 0 && (
        <span
          className={cn(
            "text-xs font-semibold",
            change > 0 ? "text-success" : "text-error"
          )}
        >
          {change > 0 ? `+${change}` : change}
        </span>
      )}
    </div>
  );
}

// Alternative text-based position display
export function PositionText({
  position,
  className,
}: {
  position: number;
  className?: string;
}) {
  const getColor = () => {
    if (position === 1) return "text-gold";
    if (position === 2) return "text-silver";
    if (position === 3) return "text-bronze";
    return "text-muted-foreground";
  };

  return (
    <span className={cn("font-bold font-mono", getColor(), className)}>
      {getOrdinalSuffix(position)}
    </span>
  );
}
