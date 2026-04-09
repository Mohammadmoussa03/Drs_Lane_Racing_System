export interface User {
  id: string
  username: string
  email: string
  first_name?: string
  last_name?: string
  profile_picture?: string
  tier: 'rookie' | 'intermediate' | 'pro' | 'champion'
  points: number
  created_at: string
}

export interface Race {
  id: string
  name: string
  description: string
  track_name: string
  scheduled_date: string
  status: 'upcoming' | 'ongoing' | 'completed'
  max_participants: number
  current_participants: number
  entry_fee?: number
  format: string
  laps?: number
}

export interface RaceResult {
  id: string
  race_id: string
  driver_id: string
  position: number
  time?: string
  points_earned: number
  fastest_lap?: boolean
}

export interface Championship {
  id: string
  name: string
  season: number
  status: 'upcoming' | 'active' | 'completed'
  rounds: number
  start_date: string
  end_date?: string
  created_at: string
}

export interface Leaderboard {
  position: number
  driver: User
  points: number
  races_completed: number
  wins: number
  podiums: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface DriverAchievement {
  id: string
  driver_id: string
  achievement_id: string
  earned_at: string
  achievement: Achievement
}

export interface Notification {
  id: string
  user_id: string
  type: 'race' | 'achievement' | 'promotion' | 'message'
  title: string
  message: string
  read: boolean
  created_at: string
}
