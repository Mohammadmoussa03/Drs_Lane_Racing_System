"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DriverCard } from "@/components/racing/driver-card";
import { TierBadge } from "@/components/racing/tier-badge";
import type { User, DriverStats, SkillTier } from "@/lib/types";
import { Search, Users, Filter } from "lucide-react";

// Mock data
const generateMockDrivers = (count: number): { user: User; stats: DriverStats }[] => {
  const names = [
    ["Alex", "Thunder"], ["Maria", "Speed"], ["Jake", "Velocity"],
    ["Sarah", "Swift"], ["Mike", "Turbo"], ["Emma", "Flash"],
    ["Chris", "Nitro"], ["Lisa", "Blaze"], ["Tom", "Drift"],
    ["Anna", "Storm"], ["Ryan", "Ace"], ["Kate", "Fury"],
  ];
  
  const tiers: SkillTier[] = ["legend", "elite", "pro", "semi-pro", "amateur", "rookie"];
  
  return Array.from({ length: count }, (_, i) => {
    const tierIndex = Math.min(Math.floor(i / 2), tiers.length - 1);
    const nameIndex = i % names.length;
    
    return {
      user: {
        id: i + 1,
        first_name: names[nameIndex][0],
        last_name: names[nameIndex][1],
        email: `${names[nameIndex][0].toLowerCase()}@example.com`,
        is_verified: true,
        created_at: "2024-01-15",
      },
      stats: {
        id: i + 1,
        user: i + 1,
        skill_tier: tiers[tierIndex],
        skill_rating: 2500 - i * 80,
        total_races: 100 - i * 3,
        wins: Math.max(50 - i * 3, 1),
        podiums: Math.max(70 - i * 3, 3),
        best_lap_time: 44000 + i * 150,
        average_finish_position: 1 + i * 0.3,
        total_laps: 2000 - i * 80,
        total_points: 15000 - i * 800,
        current_streak: Math.max(8 - i, 0),
        best_streak: 12 - Math.floor(i / 2),
        experience_points: 50000 - i * 2000,
        level: 50 - Math.floor(i / 1.5),
        created_at: "2024-01-15",
        updated_at: "2024-04-08",
      },
    };
  });
};

const mockDrivers = generateMockDrivers(12);

const tierFilters: { value: SkillTier | "all"; label: string }[] = [
  { value: "all", label: "All Tiers" },
  { value: "legend", label: "Legend" },
  { value: "elite", label: "Elite" },
  { value: "pro", label: "Pro" },
  { value: "semi-pro", label: "Semi-Pro" },
  { value: "amateur", label: "Amateur" },
  { value: "rookie", label: "Rookie" },
];

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<SkillTier | "all">("all");

  const filteredDrivers = mockDrivers.filter((driver) => {
    const matchesSearch =
      `${driver.user.first_name} ${driver.user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "all" || driver.stats.skill_tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-primary">Drivers</span>
        </h1>
        <p className="text-muted-foreground">
          Explore driver profiles, stats, and compare head-to-head.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {tierFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={tierFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTierFilter(filter.value)}
            >
              {filter.value !== "all" && (
                <TierBadge tier={filter.value} size="sm" showLabel={false} className="mr-1" />
              )}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-muted-foreground" />
        <span className="text-muted-foreground">
          {filteredDrivers.length} driver{filteredDrivers.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Drivers Grid */}
      {filteredDrivers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver, index) => (
            <DriverCard
              key={driver.user.id}
              user={driver.user}
              stats={driver.stats}
              rank={index + 1}
              showRank
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No drivers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setTierFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
