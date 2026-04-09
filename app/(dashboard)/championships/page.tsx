"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChampionshipCard } from "@/components/racing/championship-card";
import type { Championship, SkillTier } from "@/lib/types";
import {
  Trophy,
  Calendar,
  Filter,
  Star,
} from "lucide-react";

// Mock data
const mockChampionships: Championship[] = [
  {
    id: 1,
    name: "Spring Championship 2026",
    description: "The premier spring racing championship. Battle through 8 rounds to claim the title and a share of the prize pool.",
    season: 2026,
    start_date: "2026-03-01",
    end_date: "2026-05-31",
    status: "active",
    total_rounds: 8,
    completed_rounds: 4,
    min_skill_tier: "amateur" as SkillTier,
    max_skill_tier: "elite" as SkillTier,
    entry_fee: 150,
    prize_pool: 5000,
    created_at: "2024-01-01",
  },
  {
    id: 2,
    name: "Rookie League Season 5",
    description: "Perfect for new racers looking to compete in a structured championship environment.",
    season: 2026,
    start_date: "2026-04-01",
    end_date: "2026-06-30",
    status: "active",
    total_rounds: 6,
    completed_rounds: 2,
    max_skill_tier: "amateur" as SkillTier,
    entry_fee: 50,
    prize_pool: 1000,
    created_at: "2024-01-01",
  },
  {
    id: 3,
    name: "Pro League Championship",
    description: "Elite competition for the best drivers. Only the top tier racers may compete.",
    season: 2026,
    start_date: "2026-05-01",
    end_date: "2026-08-31",
    status: "upcoming",
    total_rounds: 10,
    completed_rounds: 0,
    min_skill_tier: "pro" as SkillTier,
    entry_fee: 300,
    prize_pool: 15000,
    created_at: "2024-01-01",
  },
  {
    id: 4,
    name: "Summer Endurance Series",
    description: "Test your stamina with longer format races throughout the summer months.",
    season: 2026,
    start_date: "2026-06-01",
    end_date: "2026-08-15",
    status: "upcoming",
    total_rounds: 5,
    completed_rounds: 0,
    min_skill_tier: "semi-pro" as SkillTier,
    entry_fee: 200,
    prize_pool: 8000,
    created_at: "2024-01-01",
  },
  {
    id: 5,
    name: "Winter Championship 2025",
    description: "The completed winter championship from last season.",
    season: 2025,
    start_date: "2025-12-01",
    end_date: "2026-02-28",
    status: "completed",
    total_rounds: 8,
    completed_rounds: 8,
    entry_fee: 150,
    prize_pool: 5000,
    created_at: "2024-01-01",
  },
];

const statusFilters = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

export default function ChampionshipsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredChampionships = mockChampionships.filter((championship) => {
    if (statusFilter === "all") return true;
    return championship.status === statusFilter;
  });

  const activeChampionships = filteredChampionships.filter((c) => c.status === "active");
  const upcomingChampionships = filteredChampionships.filter((c) => c.status === "upcoming");
  const completedChampionships = filteredChampionships.filter((c) => c.status === "completed");

  const handleJoin = (id: number) => {
    console.log("Joining championship:", id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-primary">Championships</span>
        </h1>
        <p className="text-muted-foreground">
          Compete in structured championships and prove you&apos;re the best.
        </p>
      </div>

      {/* Featured Championship */}
      {activeChampionships.length > 0 && (
        <Card className="mb-8 overflow-hidden border-primary/30">
          <div className="absolute top-0 left-0 right-0 h-1 racing-stripe" />
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gold/20 rounded-lg">
                <Star className="h-6 w-6 text-gold" />
              </div>
              <div>
                <Badge variant="default" className="mb-2">Featured Championship</Badge>
                <h2 className="text-2xl font-bold">{activeChampionships[0].name}</h2>
                <p className="text-muted-foreground mt-1">
                  {activeChampionships[0].description}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {activeChampionships[0].completed_rounds}/{activeChampionships[0].total_rounds}
                </p>
                <p className="text-sm text-muted-foreground">Rounds Complete</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-gold">
                  ${activeChampionships[0].prize_pool?.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Prize Pool</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">
                  ${activeChampionships[0].entry_fee}
                </p>
                <p className="text-sm text-muted-foreground">Entry Fee</p>
              </div>
              <div className="flex items-center justify-center">
                <Button skewed onClick={() => handleJoin(activeChampionships[0].id)}>
                  <span>View Details</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
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

      {/* Active Championships */}
      {activeChampionships.length > 0 && statusFilter !== "upcoming" && statusFilter !== "completed" && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <h2 className="text-xl font-bold">Active Championships</h2>
            <Badge variant="success">{activeChampionships.length}</Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {activeChampionships.map((championship) => (
              <ChampionshipCard
                key={championship.id}
                championship={championship}
                onJoin={handleJoin}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Championships */}
      {upcomingChampionships.length > 0 && statusFilter !== "active" && statusFilter !== "completed" && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold">Upcoming Championships</h2>
            <Badge variant="secondary">{upcomingChampionships.length}</Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingChampionships.map((championship) => (
              <ChampionshipCard
                key={championship.id}
                championship={championship}
                onJoin={handleJoin}
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed Championships */}
      {completedChampionships.length > 0 && statusFilter !== "active" && statusFilter !== "upcoming" && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold">Past Championships</h2>
            <Badge variant="secondary">{completedChampionships.length}</Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {completedChampionships.map((championship) => (
              <ChampionshipCard
                key={championship.id}
                championship={championship}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredChampionships.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No championships found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or check back later for new championships.
            </p>
            <Button variant="outline" onClick={() => setStatusFilter("all")}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
