import { cn } from "@/lib/utils";
import type { SkillTier } from "@/lib/types";
import {
  Shield,
  Star,
  Zap,
  Trophy,
  Crown,
  Flame,
} from "lucide-react";

interface TierBadgeProps {
  tier: SkillTier;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const tierConfig: Record<
  SkillTier,
  { label: string; color: string; bgColor: string; icon: React.ElementType }
> = {
  rookie: {
    label: "Rookie",
    color: "text-white",
    bgColor: "bg-tier-rookie",
    icon: Shield,
  },
  amateur: {
    label: "Amateur",
    color: "text-white",
    bgColor: "bg-tier-amateur",
    icon: Star,
  },
  "semi-pro": {
    label: "Semi-Pro",
    color: "text-white",
    bgColor: "bg-tier-semi-pro",
    icon: Zap,
  },
  pro: {
    label: "Pro",
    color: "text-white",
    bgColor: "bg-tier-pro",
    icon: Trophy,
  },
  elite: {
    label: "Elite",
    color: "text-black",
    bgColor: "bg-tier-elite",
    icon: Crown,
  },
  legend: {
    label: "Legend",
    color: "text-white",
    bgColor: "bg-tier-legend",
    icon: Flame,
  },
};

const sizeClasses = {
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-8 px-3 text-sm gap-1.5",
  lg: "h-10 px-4 text-base gap-2",
};

const iconSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function TierBadge({
  tier,
  size = "md",
  showLabel = true,
  className,
}: TierBadgeProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center font-bold uppercase tracking-wider",
        config.bgColor,
        config.color,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}
