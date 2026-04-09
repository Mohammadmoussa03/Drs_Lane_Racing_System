'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiClient } from '@/lib/api'
import { setStoredToken } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await apiClient.login(email, password)
      if (response.access) {
        setStoredToken(response.access)
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-200px)] bg-background flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold text-foreground text-center mb-2">Welcome Back</h1>
              <p className="text-muted text-center">Sign in to your racing account</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-md text-sm">{error}</div>}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                  <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              <p className="text-center text-sm text-muted mt-4">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
