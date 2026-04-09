import type {
  User,
  Race,
  RaceBooking,
  RaceResult,
  Championship,
  ChampionshipStanding,
  Achievement,
  UserAchievement,
  Notification,
  DriverStats,
  LeaderboardEntry,
  PaginatedResponse,
  AuthTokens,
  LoginCredentials,
  RegisterData,
  HeadToHead,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Token management
let accessToken: string | null = null;
let refreshToken: string | null = null;

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("access_token");
  refreshToken = localStorage.getItem("refresh_token");
}

export function setTokens(tokens: AuthTokens) {
  accessToken = tokens.access;
  refreshToken = tokens.refresh;
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  }
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}

export function getAccessToken() {
  return accessToken;
}

// API fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && refreshToken) {
    // Try to refresh the token
    const refreshResponse = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (refreshResponse.ok) {
      const newTokens = await refreshResponse.json();
      setTokens({ access: newTokens.access, refresh: refreshToken });
      
      // Retry the original request
      (headers as Record<string, string>)["Authorization"] = `Bearer ${newTokens.access}`;
      const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
      
      if (!retryResponse.ok) {
        throw new Error(`API Error: ${retryResponse.status}`);
      }
      return retryResponse.json();
    } else {
      clearTokens();
      throw new Error("Session expired. Please login again.");
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || `API Error: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthTokens> => {
    const tokens = await apiFetch<AuthTokens>("/users/token/", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setTokens(tokens);
    return tokens;
  },

  register: async (data: RegisterData): Promise<User> => {
    return apiFetch<User>("/users/register/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: () => {
    clearTokens();
  },

  getProfile: async (): Promise<User> => {
    return apiFetch<User>("/users/profile/");
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiFetch<User>("/users/profile/", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

// Races API
export const racesApi = {
  list: async (params?: Record<string, string>): Promise<PaginatedResponse<Race>> => {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    return apiFetch<PaginatedResponse<Race>>(`/races/${queryString}`);
  },

  get: async (id: number): Promise<Race> => {
    return apiFetch<Race>(`/races/${id}/`);
  },

  getUpcoming: async (): Promise<Race[]> => {
    return apiFetch<Race[]>("/races/upcoming/");
  },

  book: async (raceId: number): Promise<RaceBooking> => {
    return apiFetch<RaceBooking>(`/races/${raceId}/book/`, {
      method: "POST",
    });
  },

  cancelBooking: async (raceId: number): Promise<void> => {
    return apiFetch<void>(`/races/${raceId}/cancel/`, {
      method: "POST",
    });
  },

  checkIn: async (raceId: number): Promise<RaceBooking> => {
    return apiFetch<RaceBooking>(`/races/${raceId}/check-in/`, {
      method: "POST",
    });
  },

  getResults: async (raceId: number): Promise<RaceResult[]> => {
    return apiFetch<RaceResult[]>(`/races/${raceId}/results/`);
  },

  getMyBookings: async (): Promise<RaceBooking[]> => {
    return apiFetch<RaceBooking[]>("/races/my-bookings/");
  },
};

// Championships API
export const championshipsApi = {
  list: async (params?: Record<string, string>): Promise<PaginatedResponse<Championship>> => {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    return apiFetch<PaginatedResponse<Championship>>(`/championships/${queryString}`);
  },

  get: async (id: number): Promise<Championship> => {
    return apiFetch<Championship>(`/championships/${id}/`);
  },

  getStandings: async (id: number): Promise<ChampionshipStanding[]> => {
    return apiFetch<ChampionshipStanding[]>(`/championships/${id}/standings/`);
  },

  join: async (id: number): Promise<void> => {
    return apiFetch<void>(`/championships/${id}/join/`, {
      method: "POST",
    });
  },

  getActive: async (): Promise<Championship[]> => {
    return apiFetch<Championship[]>("/championships/active/");
  },
};

// Driver Stats API
export const statsApi = {
  getMyStats: async (): Promise<DriverStats> => {
    return apiFetch<DriverStats>("/users/stats/");
  },

  getDriverStats: async (userId: number): Promise<DriverStats> => {
    return apiFetch<DriverStats>(`/users/${userId}/stats/`);
  },

  getLeaderboard: async (params?: Record<string, string>): Promise<LeaderboardEntry[]> => {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    return apiFetch<LeaderboardEntry[]>(`/users/leaderboard/${queryString}`);
  },

  getHeadToHead: async (userId1: number, userId2: number): Promise<HeadToHead> => {
    return apiFetch<HeadToHead>(`/users/head-to-head/${userId1}/${userId2}/`);
  },
};

// Gamification API
export const gamificationApi = {
  getAchievements: async (): Promise<Achievement[]> => {
    return apiFetch<Achievement[]>("/gamification/achievements/");
  },

  getMyAchievements: async (): Promise<UserAchievement[]> => {
    return apiFetch<UserAchievement[]>("/gamification/my-achievements/");
  },

  getBadges: async (): Promise<UserAchievement[]> => {
    return apiFetch<UserAchievement[]>("/gamification/badges/");
  },

  getRewards: async (): Promise<UserAchievement[]> => {
    return apiFetch<UserAchievement[]>("/gamification/rewards/");
  },

  claimReward: async (rewardId: number): Promise<void> => {
    return apiFetch<void>(`/gamification/rewards/${rewardId}/claim/`, {
      method: "POST",
    });
  },
};

// Notifications API
export const notificationsApi = {
  list: async (): Promise<Notification[]> => {
    return apiFetch<Notification[]>("/notifications/");
  },

  markAsRead: async (id: number): Promise<void> => {
    return apiFetch<void>(`/notifications/${id}/read/`, {
      method: "POST",
    });
  },

  markAllAsRead: async (): Promise<void> => {
    return apiFetch<void>("/notifications/read-all/", {
      method: "POST",
    });
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    return apiFetch<{ count: number }>("/notifications/unread-count/");
  },
};

// SWR Fetcher
export const fetcher = async <T>(url: string): Promise<T> => {
  return apiFetch<T>(url);
};
