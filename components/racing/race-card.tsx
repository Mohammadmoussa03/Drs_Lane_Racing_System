"use client";

import Link from "next/link";
import { cn, formatDate, formatTime } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "./tier-badge";
import type { Race } from "@/lib/types";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Timer,
  ChevronRight,
} from "lucide-react";

interface RaceCardProps {
  race: Race;
  onBook?: (raceId: number) => void;
  isBooked?: boolean;
  className?: string;
}

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "secondary" }> = {
  scheduled: { label: "Scheduled", variant: "secondary" },
  open: { label: "Open", variant: "success" },
  full: { label: "Full", variant: "warning" },
  in_progress: { label: "Live", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "secondary" },
};

const typeConfig: Record<string, { label: string; color: string }> = {
  standard: { label: "Standard", color: "text-foreground" },
  championship: { label: "Championship", color: "text-primary" },
  time_trial: { label: "Time Trial", color: "text-info" },
  endurance: { label: "Endurance", color: "text-warning" },
  team: { label: "Team", color: "text-tier-pro" },
};

export function RaceCard({ race, onBook, isBooked, className }: RaceCardProps) {
  const status = statusConfig[race.status];
  const type = typeConfig[race.race_type];
  const spotsLeft = race.max_participants - race.current_participants;
  const isFull = spotsLeft <= 0;
  const isLive = race.status === "in_progress";

  return (
    <Card
      glow
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:border-primary/50",
        isLive && "border-primary animate-pulse",
        className
      )}
    >
      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
      )}

      {/* Race type stripe */}
      <div className="absolute top-0 right-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={status.variant}>{status.label}</Badge>
              <span className={cn("text-xs font-semibold uppercase", type.color)}>
                {type.label}
              </span>
            </div>
            <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors">
              {race.name}
            </h3>
          </div>
          {race.prize_pool && race.prize_pool > 0 && (
            <div className="flex items-center gap-1 text-gold">
              <Trophy className="h-4 w-4" />
              <span className="font-bold">${race.prize_pool}</span>
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(race.scheduled_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime(race.scheduled_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>{race.duration_minutes} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span
              className={cn(
                "font-semibold",
                isFull ? "text-error" : spotsLeft <= 3 ? "text-warning" : "text-success"
              )}
            >
              {race.current_participants}/{race.max_participants}
            </span>
          </div>
        </div>

        {/* Tier Requirements */}
        {(race.min_skill_tier || race.max_skill_tier) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground uppercase">Tier:</span>
            {race.min_skill_tier && <TierBadge tier={race.min_skill_tier} size="sm" />}
            {race.min_skill_tier && race.max_skill_tier && (
              <span className="text-muted-foreground">-</span>
            )}
            {race.max_skill_tier && <TierBadge tier={race.max_skill_tier} size="sm" />}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between gap-4">
        <div className="text-sm">
          {race.entry_fee > 0 ? (
            <span className="font-bold">${race.entry_fee} <span className="text-muted-foreground font-normal">entry</span></span>
          ) : (
            <span className="text-success font-semibold">Free Entry</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isBooked ? (
            <Badge variant="success">Booked</Badge>
          ) : race.status === "open" && !isFull && onBook ? (
            <Button size="sm" onClick={() => onBook(race.id)}>
              Book Now
            </Button>
          ) : null}
          <Link href={`/races/${race.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">View race details</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
