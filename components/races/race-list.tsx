"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, Clock, Users, MapPin, Zap, 
  ChevronRight, LayoutGrid, List 
} from "lucide-react";
import { cn } from "@/lib/utils";

const races = [
  {
    id: 1,
    title: "Sunday Sprint Challenge",
    type: "Grand Prix",
    skillLevel: "All",
    date: "Apr 13, 2026",
    time: "2:00 PM",
    duration: 30,
    track: "DRS Lane Main Circuit",
    spotsLeft: 4,
    maxDrivers: 12,
    price: 45,
    championship: "2026 Grand Prix Championship",
  },
  {
    id: 2,
    title: "Rookie Practice Session",
    type: "Practice",
    skillLevel: "Beginner",
    date: "Apr 14, 2026",
    time: "10:00 AM",
    duration: 15,
    track: "DRS Lane Main Circuit",
    spotsLeft: 8,
    maxDrivers: 12,
    price: 25,
    championship: null,
  },
  {
    id: 3,
    title: "Championship Qualifier",
    type: "Qualifying",
    skillLevel: "Advanced",
    date: "Apr 14, 2026",
    time: "4:00 PM",
    duration: 20,
    track: "DRS Lane Main Circuit",
    spotsLeft: 2,
    maxDrivers: 12,
    price: 55,
    championship: "2026 Grand Prix Championship",
  },
  {
    id: 4,
    title: "Evening Endurance Race",
    type: "Grand Prix",
    skillLevel: "Intermediate",
    date: "Apr 15, 2026",
    time: "7:00 PM",
    duration: 45,
    track: "DRS Lane Main Circuit",
    spotsLeft: 6,
    maxDrivers: 12,
    price: 50,
    championship: null,
  },
  {
    id: 5,
    title: "Midweek Madness",
    type: "Grand Prix",
    skillLevel: "All",
    date: "Apr 16, 2026",
    time: "6:00 PM",
    duration: 25,
    track: "DRS Lane Main Circuit",
    spotsLeft: 10,
    maxDrivers: 12,
    price: 40,
    championship: null,
  },
  {
    id: 6,
    title: "Pro Practice",
    type: "Practice",
    skillLevel: "Advanced",
    date: "Apr 17, 2026",
    time: "11:00 AM",
    duration: 20,
    track: "DRS Lane Main Circuit",
    spotsLeft: 5,
    maxDrivers: 8,
    price: 35,
    championship: null,
  },
  {
    id: 7,
    title: "Weekend Warm-Up",
    type: "Practice",
    skillLevel: "All",
    date: "Apr 18, 2026",
    time: "9:00 AM",
    duration: 15,
    track: "DRS Lane Main Circuit",
    spotsLeft: 12,
    maxDrivers: 12,
    price: 20,
    championship: null,
  },
  {
    id: 8,
    title: "Saturday Night Showdown",
    type: "Grand Prix",
    skillLevel: "All",
    date: "Apr 18, 2026",
    time: "8:00 PM",
    duration: 30,
    track: "DRS Lane Main Circuit",
    spotsLeft: 1,
    maxDrivers: 12,
    price: 55,
    championship: "2026 Grand Prix Championship",
  },
];

function getRaceTypeColor(type: string) {
  switch (type) {
    case "Grand Prix":
      return "bg-primary text-primary-foreground";
    case "Qualifying":
      return "bg-gold/20 text-gold border border-gold/30";
    case "Practice":
      return "bg-secondary text-foreground";
    default:
      return "bg-secondary text-foreground";
  }
}

function getSkillBadge(skill: string) {
  switch (skill) {
    case "Beginner":
      return "text-green-500";
    case "Intermediate":
      return "text-blue-500";
    case "Advanced":
      return "text-primary";
    default:
      return "text-muted-foreground";
  }
}

export function RaceList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            {races.length} Races Available
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing races from Apr 13 - Apr 18, 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-sm transition-colors",
              viewMode === "grid" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-sm transition-colors",
              viewMode === "list" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Race Grid */}
      <div className={cn(
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
          : "flex flex-col gap-3"
      )}>
        {races.map((race) => (
          <Link
            key={race.id}
            href={`/races/${race.id}`}
            className={cn(
              "group bg-card rounded-sm border border-border hover:border-primary/50 transition-all card-glow",
              viewMode === "grid" ? "p-5" : "p-4 flex items-center gap-6"
            )}
          >
            {viewMode === "grid" ? (
              // Grid View
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={cn(
                      "inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm",
                      getRaceTypeColor(race.type)
                    )}>
                      {race.type}
                    </span>
                    {race.championship && (
                      <span className="ml-2 text-xs text-gold font-medium">
                        Championship
                      </span>
                    )}
                  </div>
                  {race.spotsLeft <= 3 && (
                    <span className="flex items-center gap-1 text-xs text-primary font-medium">
                      <Zap className="w-3 h-3" />
                      {race.spotsLeft === 1 ? "Last Spot!" : "Filling Fast"}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {race.title}
                </h3>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {race.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {race.time} ({race.duration}min)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {race.track}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={cn("font-medium", getSkillBadge(race.skillLevel))}>
                      {race.skillLevel}
                    </span>
                  </div>
                </div>

                {/* Availability Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {race.spotsLeft} spots left
                    </span>
                    <span className="text-muted-foreground">
                      {race.maxDrivers - race.spotsLeft}/{race.maxDrivers}
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all rounded-full",
                        race.spotsLeft <= 2 ? "bg-primary" : "bg-primary/70"
                      )}
                      style={{
                        width: `${((race.maxDrivers - race.spotsLeft) / race.maxDrivers) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-foreground">${race.price}</span>
                    <span className="text-sm text-muted-foreground">/race</span>
                  </div>
                  <span className="flex items-center gap-1 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Book Now
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </>
            ) : (
              // List View
              <>
                {/* Type Badge */}
                <span className={cn(
                  "flex-shrink-0 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm",
                  getRaceTypeColor(race.type)
                )}>
                  {race.type}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {race.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{race.date}</span>
                    <span>{race.time}</span>
                    <span className={cn("font-medium", getSkillBadge(race.skillLevel))}>
                      {race.skillLevel}
                    </span>
                  </div>
                </div>

                {/* Spots */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm text-muted-foreground">
                    {race.spotsLeft} / {race.maxDrivers}
                  </div>
                  <div className="text-xs text-muted-foreground">spots left</div>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 text-right">
                  <span className="text-xl font-bold text-foreground">${race.price}</span>
                </div>

                {/* CTA */}
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
