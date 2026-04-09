// User & Driver Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  date_of_birth?: string;
  profile_picture?: string;
  bio?: string;
  is_verified: boolean;
  created_at: string;
}

export type SkillTier = "rookie" | "amateur" | "semi-pro" | "pro" | "elite" | "legend";

export interface DriverStats {
  id: number;
  user: number;
  skill_tier: SkillTier;
  skill_rating: number;
  total_races: number;
  wins: number;
  podiums: number;
  best_lap_time?: number;
  average_finish_position: number;
  total_laps: number;
  total_points: number;
  current_streak: number;
  best_streak: number;
  experience_points: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface DriverProfile extends User {
  stats: DriverStats;
  achievements: Achievement[];
  recent_races: RaceResult[];
}

// Race Types
export type RaceStatus = "scheduled" | "open" | "full" | "in_progress" | "completed" | "cancelled";
export type RaceType = "standard" | "championship" | "time_trial" | "endurance" | "team";

export interface Race {
  id: number;
  name: string;
  description?: string;
  race_type: RaceType;
  status: RaceStatus;
  scheduled_time: string;
  duration_minutes: number;
  max_participants: number;
  current_participants: number;
  entry_fee: number;
  prize_pool?: number;
  track_config?: string;
  min_skill_tier?: SkillTier;
  max_skill_tier?: SkillTier;
  created_at: string;
}

export interface RaceBooking {
  id: number;
  race: number;
  user: number;
  status: "pending" | "confirmed" | "checked_in" | "cancelled" | "no_show";
  kart_number?: number;
  position?: number;
  booking_time: string;
  check_in_time?: string;
}

export interface RaceResult {
  id: number;
  race: Race;
  user: User;
  final_position: number;
  best_lap_time?: number;
  average_lap_time?: number;
  total_laps: number;
  points_earned: number;
  penalties?: string;
  created_at: string;
}

export interface LapTime {
  id: number;
  race_result: number;
  lap_number: number;
  lap_time: number;
  sector_1_time?: number;
  sector_2_time?: number;
  sector_3_time?: number;
  is_personal_best: boolean;
  is_race_best: boolean;
}

// Championship Types
export interface Championship {
  id: number;
  name: string;
  description?: string;
  season: number;
  start_date: string;
  end_date: string;
  status: "upcoming" | "active" | "completed";
  total_rounds: number;
  completed_rounds: number;
  min_skill_tier?: SkillTier;
  max_skill_tier?: SkillTier;
  entry_fee?: number;
  prize_pool?: number;
  created_at: string;
}

export interface ChampionshipStanding {
  id: number;
  championship: number;
  user: User;
  position: number;
  total_points: number;
  races_completed: number;
  wins: number;
  podiums: number;
  best_finish: number;
  average_finish: number;
}

export interface ChampionshipRound {
  id: number;
  championship: number;
  race: Race;
  round_number: number;
  points_multiplier: number;
}

// Gamification Types
export type AchievementCategory = "racing" | "consistency" | "speed" | "championship" | "social" | "milestone";
export type AchievementRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface Achievement {
  id: number;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon?: string;
  points: number;
  requirement_type: string;
  requirement_value: number;
  created_at: string;
}

export interface UserAchievement {
  id: number;
  user: number;
  achievement: Achievement;
  earned_at: string;
  progress: number;
  is_completed: boolean;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon?: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  category: string;
}

export interface UserBadge {
  id: number;
  user: number;
  badge: Badge;
  earned_at: string;
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  reward_type: "discount" | "free_race" | "merchandise" | "points" | "badge";
  value: number;
  points_required: number;
  is_active: boolean;
  stock?: number;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  stats: DriverStats;
  change?: number; // Position change from previous period
}

export interface LeaderboardFilters {
  period: "all_time" | "season" | "month" | "week";
  skill_tier?: SkillTier;
  metric: "points" | "wins" | "podiums" | "rating" | "best_lap";
}

// Notification Types
export type NotificationType = "race_reminder" | "booking_confirmed" | "results_posted" | "achievement_unlocked" | "championship_update" | "system";

export interface Notification {
  id: number;
  user: number;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

// Head-to-Head Types
export interface HeadToHead {
  driver1: DriverProfile;
  driver2: DriverProfile;
  total_races: number;
  driver1_wins: number;
  driver2_wins: number;
  common_races: RaceResult[];
  best_lap_comparison: {
    driver1_best: number;
    driver2_best: number;
  };
}

// API Response Types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

// Auth Types
export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  date_of_birth?: string;
}
