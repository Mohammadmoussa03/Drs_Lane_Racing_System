'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/lib/auth'

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-200px)] bg-background">
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-pretty">
                Welcome to <span className="text-primary">DRS Racing</span>
              </h1>
              <p className="text-xl text-muted mb-8">
                The premier competitive racing platform. Track championships, climb the leaderboard, and compete with elite drivers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuth ? (
                  <>
                    <Link href="/dashboard">
                      <Button size="lg">Go to Dashboard</Button>
                    </Link>
                    <Link href="/races">
                      <Button size="lg" variant="outline">
                        Browse Races
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/register">
                      <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button size="lg" variant="outline">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-12 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">D</div>
                  <p className="text-foreground text-lg">Elite Racing Platform</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-secondary border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">Live Races</h3>
              <p className="text-muted">Join exciting races and compete in real-time with drivers from around the world.</p>
            </div>
            <div className="bg-secondary border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">Championships</h3>
              <p className="text-muted">Participate in seasonal championships and work your way to the top of the standings.</p>
            </div>
            <div className="bg-secondary border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">Leaderboards</h3>
              <p className="text-muted">Track your progress and see how you rank against the best drivers on the platform.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
