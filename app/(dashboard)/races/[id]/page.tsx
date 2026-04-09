"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TierBadge } from "@/components/racing/tier-badge";
import { PositionText } from "@/components/racing/position-badge";
import { formatDate, formatTime, formatLapTime } from "@/lib/utils";
import type { Race, RaceResult, SkillTier, User } from "@/lib/types";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Timer,
  MapPin,
  ArrowLeft,
  Flag,
  AlertCircle,
  CheckCircle,
  Zap,
} from "lucide-react";

// Mock data
const mockRace: Race = {
  id: 1,
  name: "Sunday Sprint Series",
  description: "Weekly sprint race for all skill levels. Great for building experience and competing against a variety of drivers. Top 3 finishers receive bonus points towards the monthly championship.",
  race_type: "standard",
  status: "open",
  scheduled_time: "2026-04-12T14:00:00Z",
  duration_minutes: 15,
  max_participants: 12,
  current_participants: 8,
  entry_fee: 45,
  prize_pool: 200,
  track_config: "Grand Prix Layout",
  min_skill_tier: "rookie" as SkillTier,
  max_skill_tier: "pro" as SkillTier,
  created_at: "2024-01-01",
};

const mockParticipants: { user: User; stats: { skill_tier: SkillTier; wins: number } }[] = [
  { user: { id: 1, first_name: "Alex", last_name: "Thunder", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "pro", wins: 23 } },
  { user: { id: 2, first_name: "Maria", last_name: "Speed", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "semi-pro", wins: 15 } },
  { user: { id: 3, first_name: "Jake", last_name: "Velocity", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "amateur", wins: 8 } },
  { user: { id: 4, first_name: "Sarah", last_name: "Swift", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "semi-pro", wins: 12 } },
  { user: { id: 5, first_name: "Mike", last_name: "Turbo", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "amateur", wins: 5 } },
  { user: { id: 6, first_name: "Emma", last_name: "Flash", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "rookie", wins: 2 } },
  { user: { id: 7, first_name: "Chris", last_name: "Nitro", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "semi-pro", wins: 18 } },
  { user: { id: 8, first_name: "Lisa", last_name: "Blaze", email: "", is_verified: true, created_at: "" }, stats: { skill_tier: "amateur", wins: 7 } },
];

const mockPreviousResults: RaceResult[] = [
  {
    id: 1,
    race: { ...mockRace, name: "Sunday Sprint - Week 10" },
    user: { id: 10, first_name: "John", last_name: "Winner", email: "", is_verified: true, created_at: "" },
    final_position: 1,
    best_lap_time: 44850,
    total_laps: 18,
    points_earned: 100,
    created_at: "2026-04-05",
  },
  {
    id: 2,
    race: { ...mockRace, name: "Sunday Sprint - Week 10" },
    user: { id: 11, first_name: "Jane", last_name: "Second", email: "", is_verified: true, created_at: "" },
    final_position: 2,
    best_lap_time: 45120,
    total_laps: 18,
    points_earned: 80,
    created_at: "2026-04-05",
  },
  {
    id: 3,
    race: { ...mockRace, name: "Sunday Sprint - Week 10" },
    user: { id: 12, first_name: "Bob", last_name: "Third", email: "", is_verified: true, created_at: "" },
    final_position: 3,
    best_lap_time: 45340,
    total_laps: 18,
    points_earned: 60,
    created_at: "2026-04-05",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "secondary"; icon: React.ElementType }> = {
  scheduled: { label: "Scheduled", variant: "secondary", icon: Calendar },
  open: { label: "Open for Booking", variant: "success", icon: CheckCircle },
  full: { label: "Full - Waitlist Available", variant: "warning", icon: AlertCircle },
  in_progress: { label: "Race in Progress", variant: "default", icon: Flag },
  completed: { label: "Completed", variant: "secondary", icon: Trophy },
  cancelled: { label: "Cancelled", variant: "secondary", icon: AlertCircle },
};

export default function RaceDetailPage() {
  const params = useParams();
  const [isBooked, setIsBooked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const race = mockRace;
  const spotsLeft = race.max_participants - race.current_participants;
  const isFull = spotsLeft <= 0;
  const status = statusConfig[race.status];
  const StatusIcon = status.icon;

  const handleBook = async () => {
    setIsBooking(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsBooked(true);
    setIsBooking(false);
  };

  const handleCancel = async () => {
    setIsBooking(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsBooked(false);
    setIsBooking(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link href="/races" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Races
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Race Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={status.variant} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                    <Badge variant="outline" className="uppercase">
                      {race.race_type.replace("_", " ")}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">{race.name}</h1>
                </div>
                {race.prize_pool && race.prize_pool > 0 && (
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-gold">
                      <Trophy className="h-5 w-5" />
                      <span className="text-2xl font-bold">${race.prize_pool}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Prize Pool</span>
                  </div>
                )}
              </div>

              {race.description && (
                <p className="text-muted-foreground mb-6">{race.description}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{formatDate(race.scheduled_time)}</p>
                    <p className="text-xs text-muted-foreground">Date</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{formatTime(race.scheduled_time)}</p>
                    <p className="text-xs text-muted-foreground">Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{race.duration_minutes} mins</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{race.track_config || "Standard"}</p>
                    <p className="text-xs text-muted-foreground">Track</p>
                  </div>
                </div>
              </div>

              {/* Tier Requirements */}
              {(race.min_skill_tier || race.max_skill_tier) && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Skill Tier Requirements</p>
                  <div className="flex items-center gap-2">
                    {race.min_skill_tier && <TierBadge tier={race.min_skill_tier} />}
                    {race.min_skill_tier && race.max_skill_tier && (
                      <span className="text-muted-foreground">to</span>
                    )}
                    {race.max_skill_tier && <TierBadge tier={race.max_skill_tier} />}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Registered Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Registered Drivers
                <Badge variant="secondary">{race.current_participants}/{race.max_participants}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockParticipants.map((participant, index) => (
                  <Link
                    key={participant.user.id}
                    href={`/drivers/${participant.user.id}`}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-6">#{index + 1}</span>
                      <Avatar
                        src={null}
                        fallback={`${participant.user.first_name} ${participant.user.last_name}`}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">
                          {participant.user.first_name} {participant.user.last_name}
                        </p>
                        <TierBadge tier={participant.stats.skill_tier} size="sm" />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gold">{participant.stats.wins}</p>
                      <p className="text-xs text-muted-foreground">wins</p>
                    </div>
                  </Link>
                ))}
                {spotsLeft > 0 && (
                  <div className="flex items-center justify-center p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground">
                    <span>{spotsLeft} spots remaining</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Previous Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Previous Race Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPreviousResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-3 border-l-2 border-border"
                  >
                    <div className="flex items-center gap-4">
                      <PositionText position={result.final_position} className="text-xl" />
                      <Avatar
                        src={null}
                        fallback={`${result.user.first_name} ${result.user.last_name}`}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">
                          {result.user.first_name} {result.user.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Best Lap: {result.best_lap_time ? formatLapTime(result.best_lap_time) : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">+{result.points_earned}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold">${race.entry_fee}</p>
                <p className="text-muted-foreground">Entry Fee</p>
              </div>

              {/* Spots Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Availability</span>
                  <span className={isFull ? "text-warning font-semibold" : "text-success font-semibold"}>
                    {isFull ? "Full" : `${spotsLeft} spots left`}
                  </span>
                </div>
                <Progress
                  value={(race.current_participants / race.max_participants) * 100}
                  variant={isFull ? "warning" : "default"}
                />
              </div>

              {/* Action Buttons */}
              {isBooked ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-success p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">You&apos;re booked!</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleCancel}
                    disabled={isBooking}
                  >
                    {isBooking ? "Cancelling..." : "Cancel Booking"}
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBook}
                  disabled={isBooking || race.status !== "open"}
                  skewed
                >
                  <span>
                    {isBooking
                      ? "Booking..."
                      : isFull
                      ? "Join Waitlist"
                      : "Book Now"}
                  </span>
                </Button>
              )}

              {/* Race Details */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Race Type</span>
                  <span className="font-medium capitalize">{race.race_type.replace("_", " ")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{race.duration_minutes} minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-medium">{race.max_participants} drivers</span>
                </div>
                {race.prize_pool && race.prize_pool > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prize Pool</span>
                    <span className="font-medium text-gold">${race.prize_pool}</span>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Pro Tip</p>
                    <p className="text-muted-foreground">
                      Arrive 15 minutes early for check-in and kart assignment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
