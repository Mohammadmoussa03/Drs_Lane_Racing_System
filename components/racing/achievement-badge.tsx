import { cn } from "@/lib/utils";
import type { Achievement, AchievementRarity } from "@/lib/types";
import { Trophy, Star, Zap, Award, Crown, Sparkles } from "lucide-react";

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked?: boolean;
  progress?: number;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
  className?: string;
}

const rarityConfig: Record<
  AchievementRarity,
  { color: string; bgColor: string; borderColor: string; glow: string }
> = {
  common: {
    color: "text-gray-400",
    bgColor: "bg-gray-900",
    borderColor: "border-gray-700",
    glow: "",
  },
  uncommon: {
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    borderColor: "border-green-700",
    glow: "shadow-green-500/20",
  },
  rare: {
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-700",
    glow: "shadow-blue-500/20",
  },
  epic: {
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-700",
    glow: "shadow-purple-500/30",
  },
  legendary: {
    color: "text-amber-400",
    bgColor: "bg-amber-900/20",
    borderColor: "border-amber-500",
    glow: "shadow-amber-500/40",
  },
};

const categoryIcons: Record<string, React.ElementType> = {
  racing: Trophy,
  consistency: Star,
  speed: Zap,
  championship: Award,
  social: Crown,
  milestone: Sparkles,
};

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

const iconSizes = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-9 w-9",
};

export function AchievementBadge({
  achievement,
  unlocked = false,
  progress = 0,
  size = "md",
  showDetails = true,
  className,
}: AchievementBadgeProps) {
  const rarity = rarityConfig[achievement.rarity];
  const Icon = categoryIcons[achievement.category] || Trophy;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Badge Icon */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg border-2 transition-all",
          sizeClasses[size],
          unlocked ? rarity.bgColor : "bg-muted",
          unlocked ? rarity.borderColor : "border-border",
          unlocked && `shadow-lg ${rarity.glow}`,
          !unlocked && "opacity-50 grayscale"
        )}
      >
        <Icon
          className={cn(
            iconSizes[size],
            unlocked ? rarity.color : "text-muted-foreground"
          )}
        />
        {/* Progress ring for locked achievements */}
        {!unlocked && progress > 0 && (
          <svg
            className="absolute inset-0"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${progress * 2.83} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="text-primary"
            />
          </svg>
        )}
      </div>

      {/* Details */}
      {showDetails && (
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              "font-bold truncate",
              unlocked ? rarity.color : "text-muted-foreground"
            )}
          >
            {achievement.name}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                "text-xs font-semibold uppercase",
                rarity.color
              )}
            >
              {achievement.rarity}
            </span>
            <span className="text-xs text-muted-foreground">
              +{achievement.points} pts
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Grid display for multiple achievements
export function AchievementGrid({
  achievements,
  userAchievements = [],
  className,
}: {
  achievements: Achievement[];
  userAchievements?: { achievement: Achievement; progress: number }[];
  className?: string;
}) {
  const getProgress = (achievementId: number) => {
    const userAch = userAchievements.find(
      (ua) => ua.achievement.id === achievementId
    );
    return userAch?.progress || 0;
  };

  const isUnlocked = (achievementId: number) => {
    return userAchievements.some(
      (ua) => ua.achievement.id === achievementId && ua.progress >= 100
    );
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {achievements.map((achievement) => (
        <AchievementBadge
          key={achievement.id}
          achievement={achievement}
          unlocked={isUnlocked(achievement.id)}
          progress={getProgress(achievement.id)}
        />
      ))}
    </div>
  );
}
