'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { isAuthenticated, removeStoredToken } from '@/lib/auth'
import { useState, useEffect } from 'react'

export function Header() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [])

  const handleLogout = () => {
    removeStoredToken()
    setIsAuth(false)
    router.push('/auth/login')
  }

  return (
    <header className="bg-background border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-sm group-hover:skew-x-3 transition-transform">
            <span className="text-white text-xl font-bold flex items-center justify-center h-full">D</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">DRS Racing</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isAuth && (
            <>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/races" className="text-foreground hover:text-primary transition-colors">
                Races
              </Link>
              <Link href="/leaderboard" className="text-foreground hover:text-primary transition-colors">
                Leaderboard
              </Link>
              <Link href="/drivers" className="text-foreground hover:text-primary transition-colors">
                Drivers
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuth ? (
            <>
              <Link href="/settings">
                <Button variant="outline" size="sm">
                  Settings
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
