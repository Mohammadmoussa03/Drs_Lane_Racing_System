"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Mock race dates for demo
const raceDates = [8, 10, 13, 14, 15, 20, 21, 27, 28];

export function RaceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className="bg-card rounded-sm border border-border p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-secondary rounded-sm transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="font-bold text-foreground">
          {monthName} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-secondary rounded-sm transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const hasRace = raceDates.includes(day);
          const isToday = day === 8 && month === 3 && year === 2026; // Apr 8, 2026

          return (
            <button
              key={day}
              className={cn(
                "aspect-square flex items-center justify-center text-sm rounded-sm transition-colors relative",
                isToday && "bg-primary text-primary-foreground font-bold",
                !isToday && hasRace && "bg-primary/10 text-primary font-medium hover:bg-primary/20",
                !isToday && !hasRace && "text-muted-foreground hover:bg-secondary"
              )}
            >
              {day}
              {hasRace && !isToday && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full" />
          Race Day
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-primary rounded-sm" />
          Today
        </div>
      </div>
    </div>
  );
}
