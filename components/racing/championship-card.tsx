import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TierBadge } from "./tier-badge";
import type { Championship } from "@/lib/types";
import { Calendar, Trophy, Flag, Users, ChevronRight } from "lucide-react";

interface ChampionshipCardProps {
  championship: Championship;
  onJoin?: (id: number) => void;
  isEnrolled?: boolean;
  className?: string;
}

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "secondary" }> = {
  upcoming: { label: "Upcoming", variant: "secondary" },
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "secondary" },
};

export function ChampionshipCard({
  championship,
  onJoin,
  isEnrolled,
  className,
}: ChampionshipCardProps) {
  const status = statusConfig[championship.status];
  const progress = (championship.completed_rounds / championship.total_rounds) * 100;
  const isActive = championship.status === "active";

  return (
    <Card
      glow
      bracket
      className={cn(
        "group relative overflow-hidden hover:border-primary/50 transition-all",
        isActive && "border-primary/30",
        className
      )}
    >
      {/* Championship stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 racing-stripe" />

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={status.variant}>{status.label}</Badge>
              <span className="text-sm text-muted-foreground">
                Season {championship.season}
              </span>
            </div>
            <h3 className="text-xl font-bold truncate group-hover:text-primary transition-colors">
              {championship.name}
            </h3>
          </div>
          {championship.prize_pool && championship.prize_pool > 0 && (
            <div className="flex items-center gap-1 text-gold shrink-0">
              <Trophy className="h-5 w-5" />
              <span className="font-bold">${championship.prize_pool.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {championship.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {championship.description}
          </p>
        )}

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">
              {championship.completed_rounds} / {championship.total_rounds} rounds
            </span>
          </div>
          <Progress value={progress} variant={isActive ? "default" : "success"} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(championship.start_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flag className="h-4 w-4" />
            <span>{formatDate(championship.end_date)}</span>
          </div>
        </div>

        {/* Tier Requirements */}
        {(championship.min_skill_tier || championship.max_skill_tier) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground uppercase">Tier:</span>
            {championship.min_skill_tier && (
              <TierBadge tier={championship.min_skill_tier} size="sm" />
            )}
            {championship.min_skill_tier && championship.max_skill_tier && (
              <span className="text-muted-foreground">to</span>
            )}
            {championship.max_skill_tier && (
              <TierBadge tier={championship.max_skill_tier} size="sm" />
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between gap-4">
        <div className="text-sm">
          {championship.entry_fee && championship.entry_fee > 0 ? (
            <span className="font-bold">
              ${championship.entry_fee}{" "}
              <span className="text-muted-foreground font-normal">entry</span>
            </span>
          ) : (
            <span className="text-success font-semibold">Free Entry</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEnrolled ? (
            <Badge variant="success">Enrolled</Badge>
          ) : championship.status === "upcoming" && onJoin ? (
            <Button size="sm" onClick={() => onJoin(championship.id)}>
              Join
            </Button>
          ) : null}
          <Link href={`/championships/${championship.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">View championship details</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
