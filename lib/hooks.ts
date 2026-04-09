import { useEffect, useState } from 'react'

/**
 * Hook to get API base URL from environment
 */
export function useApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
}

/**
 * Hook to get auth token
 */
export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token')
      setToken(storedToken)
      setLoading(false)
    }
  }, [])

  return { token, loading }
}

/**
 * Hook for making authenticated API requests
 */
export function useFetch<T = any>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const { token } = useAuthToken()

  useEffect(() => {
    if (!url) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          ...options?.headers,
        }

        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(url, {
          ...options,
          headers,
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, token])

  return { data, error, loading }
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Format points/score with animation-ready value
 */
export function formatScore(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`
  }
  return points.toString()
}

/**
 * Get tier color based on tier name
 */
export function getTierColor(tier: string): string {
  const tierColors: Record<string, string> = {
    'Rookie': '#3B82F6', // blue
    'Amateur': '#8B5CF6', // purple
    'Professional': '#EC4899', // pink
    'Champion': '#F59E0B', // amber
    'Legend': '#FBBF24', // gold
  }
  return tierColors[tier] || '#6B7280'
}

/**
 * Get position badge styling
 */
export function getPositionStyle(position: number): { bg: string; text: string } {
  switch (position) {
    case 1:
      return { bg: '#FCD34D', text: '#000000' } // gold
    case 2:
      return { bg: '#D1D5DB', text: '#000000' } // silver
    case 3:
      return { bg: '#FCA5A5', text: '#000000' } // bronze
    default:
      return { bg: '#374151', text: '#FFFFFF' } // gray
  }
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format time for display
 */
export function formatTime(time: string): string {
  const t = new Date(`2000-01-01T${time}`)
  return t.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
