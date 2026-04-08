"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const raceTypes = [
  { value: "all", label: "All Types" },
  { value: "practice", label: "Practice" },
  { value: "qualifying", label: "Qualifying" },
  { value: "grandprix", label: "Grand Prix" },
];

const skillLevels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const statuses = [
  { value: "open", label: "Open" },
  { value: "full", label: "Full" },
  { value: "all", label: "Show All" },
];

export function RaceFilters() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("open");

  return (
    <div className="bg-card rounded-sm border border-border p-5">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-foreground">Filters</h2>
      </div>

      {/* Race Type */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-3 block">
          Race Type
        </label>
        <div className="space-y-2">
          {raceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors",
                selectedType === type.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Level */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-3 block">
          Skill Level
        </label>
        <div className="space-y-2">
          {skillLevels.map((skill) => (
            <button
              key={skill.value}
              onClick={() => setSelectedSkill(skill.value)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors",
                selectedSkill === skill.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-3 block">
          Availability
        </label>
        <div className="space-y-2">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors",
                selectedStatus === status.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setSelectedType("all");
          setSelectedSkill("all");
          setSelectedStatus("open");
        }}
        className="w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary border border-border rounded-sm hover:border-primary/50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}
