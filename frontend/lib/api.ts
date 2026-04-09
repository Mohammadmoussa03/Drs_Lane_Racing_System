const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

class APIClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    const url = `${this.baseURL}${endpoint}`
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Auth endpoints
  async login(username: string, password: string) {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  async register(data: any) {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getMe() {
    return this.request('/users/me/')
  }

  // Races endpoints
  async getRaces(params?: Record<string, any>) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/races/?${query}`)
  }

  async getRace(id: string) {
    return this.request(`/races/${id}/`)
  }

  async bookRace(raceId: string) {
    return this.request(`/races/${raceId}/book/`, {
      method: 'POST',
    })
  }

  async cancelBooking(raceId: string) {
    return this.request(`/races/${raceId}/cancel-booking/`, {
      method: 'POST',
    })
  }

  // Drivers endpoints
  async getDrivers(params?: Record<string, any>) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/users/?${query}`)
  }

  async getDriver(id: string) {
    return this.request(`/users/${id}/`)
  }

  async getDriverStats(id: string) {
    return this.request(`/users/${id}/stats/`)
  }

  // Leaderboard endpoints
  async getLeaderboard(params?: Record<string, any>) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/leaderboard/?${query}`)
  }

  // Championships endpoints
  async getChampionships(params?: Record<string, any>) {
    const query = new URLSearchParams(params).toString()
    return this.request(`/championships/?${query}`)
  }

  async getChampionship(id: string) {
    return this.request(`/championships/${id}/`)
  }

  async getChampionshipStandings(id: string) {
    return this.request(`/championships/${id}/standings/`)
  }

  // Achievements endpoints
  async getAchievements() {
    return this.request('/achievements/')
  }

  async getMyAchievements() {
    return this.request('/users/me/achievements/')
  }

  // Notifications endpoints
  async getNotifications() {
    return this.request('/notifications/')
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/mark-as-read/`, {
      method: 'POST',
    })
  }
}

export const apiClient = new APIClient()
