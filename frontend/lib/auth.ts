export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export const setStoredToken = (token: string) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
}

export const removeStoredToken = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('token')
}

export const isAuthenticated = (): boolean => {
  return !!getStoredToken()
}

export const getTierColor = (tier: string): string => {
  switch (tier) {
    case 'rookie':
      return 'bg-blue-600'
    case 'intermediate':
      return 'bg-purple-600'
    case 'pro':
      return 'bg-orange-600'
    case 'champion':
      return 'bg-red-600'
    default:
      return 'bg-gray-600'
  }
}

export const getTierLabel = (tier: string): string => {
  return tier.charAt(0).toUpperCase() + tier.slice(1)
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
