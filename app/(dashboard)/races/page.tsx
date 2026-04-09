"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RaceCard } from "@/components/racing/race-card";
import type { Race, SkillTier } from "@/lib/types";
import {
  Search,
  Filter,
  Calendar,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";

// Mock data
const mockRaces: Race[] = [
  {
    id: 1,
    name: "Sunday Sprint Series",
    description: "Weekly sprint race for all skill levels",
    race_type: "standard",
    status: "open",
    scheduled_time: "2026-04-12T14:00:00Z",
    duration_minutes: 15,
    max_participants: 12,
    current_participants: 8,
    entry_fee: 45,
    prize_pool: 200,
    created_at: "2024-01-01",
  },
  {
    id: 2,
    name: "Pro League Qualifier",
    description: "Qualify for the Pro League championship",
    race_type: "championship",
    status: "open",
    scheduled_time: "2026-04-15T18:00:00Z",
    duration_minutes: 20,
    max_participants: 10,
    current_participants: 10,
    entry_fee: 75,
    prize_pool: 500,
    min_skill_tier: "semi-pro" as SkillTier,
    max_skill_tier: "elite" as SkillTier,
    created_at: "2024-01-01",
  },
  {
    id: 3,
    name: "Rookie Rumble",
    description: "Perfect for new racers to get started",
    race_type: "standard",
    status: "open",
    scheduled_time: "2026-04-18T16:00:00Z",
    duration_minutes: 12,
    max_participants: 15,
    current_participants: 5,
    entry_fee: 35,
    max_skill_tier: "amateur" as SkillTier,
    created_at: "2024-01-01",
  },
  {
    id: 4,
    name: "Friday Night Lights",
    description: "Evening race under the lights",
    race_type: "standard",
    status: "scheduled",
    scheduled_time: "2026-04-19T20:00:00Z",
    duration_minutes: 15,
    max_participants: 12,
    current_participants: 0,
    entry_fee: 50,
    prize_pool: 250,
    created_at: "2024-01-01",
  },
  {
    id: 5,
    name: "Time Trial Challenge",
    description: "Set your best lap time against the clock",
    race_type: "time_trial",
    status: "open",
    scheduled_time: "2026-04-20T10:00:00Z",
    duration_minutes: 10,
    max_participants: 8,
    current_participants: 3,
    entry_fee: 30,
    created_at: "2024-01-01",
  },
  {
    id: 6,
    name: "Endurance Challenge",
    description: "Test your stamina in this longer format race",
    race_type: "endurance",
    status: "open",
    scheduled_time: "2026-04-21T14:00:00Z",
    duration_minutes: 45,
    max_participants: 10,
    current_participants: 7,
    entry_fee: 100,
    prize_pool: 1000,
    min_skill_tier: "amateur" as SkillTier,
    created_at: "2024-01-01",
  },
  {
    id: 7,
    name: "Team Battle Royale",
    description: "2v2 team racing competition",
    race_type: "team",
    status: "open",
    scheduled_time: "2026-04-22T16:00:00Z",
    duration_minutes: 20,
    max_participants: 8,
    current_participants: 4,
    entry_fee: 60,
    prize_pool: 400,
    created_at: "2024-01-01",
  },
  {
    id: 8,
    name: "Championship Round 5",
    description: "Season championship race",
    race_type: "championship",
    status: "in_progress",
    scheduled_time: "2026-04-09T14:00:00Z",
    duration_minutes: 25,
    max_participants: 12,
    current_participants: 12,
    entry_fee: 80,
    prize_pool: 800,
    min_skill_tier: "semi-pro" as SkillTier,
    created_at: "2024-01-01",
  },
];

const statusFilters = [
  { value: "all", label: "All Races" },
  { value: "open", label: "Open" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "Live" },
  { value: "completed", label: "Completed" },
];

const typeFilters = [
  { value: "all", label: "All Types" },
  { value: "standard", label: "Standard" },
  { value: "championship", label: "Championship" },
  { value: "time_trial", label: "Time Trial" },
  { value: "endurance", label: "Endurance" },
  { value: "team", label: "Team" },
];

export default function RacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRaces = mockRaces.filter((race) => {
    const matchesSearch = race.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || race.status === statusFilter;
    const matchesType = typeFilter === "all" || race.race_type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleBook = (raceId: number) => {
    // In real app, this would call the API
    console.log("Booking race:", raceId);
  };

  const liveRaces = filteredRaces.filter((r) => r.status === "in_progress");
  const upcomingRaces = filteredRaces.filter((r) => r.status !== "in_progress" && r.status !== "completed");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Upcoming <span className="text-primary">Races</span>
        </h1>
        <p className="text-muted-foreground">
          Find and book your next race. Spots fill up fast!
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search races..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={showFilters ? "secondary" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <div className="flex border border-border rounded-sm">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-sm font-medium mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={statusFilter === filter.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(filter.value)}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Race Type</p>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={typeFilter === filter.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTypeFilter(filter.value)}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Races */}
      {liveRaces.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <h2 className="text-xl font-bold">Live Now</h2>
          </div>
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {liveRaces.map((race) => (
              <RaceCard key={race.id} race={race} onBook={handleBook} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Races */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold">Upcoming Races</h2>
          <Badge variant="secondary">{upcomingRaces.length}</Badge>
        </div>

        {upcomingRaces.length > 0 ? (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {upcomingRaces.map((race) => (
              <RaceCard key={race.id} race={race} onBook={handleBook} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No races found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or check back later for new races.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
