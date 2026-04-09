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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await apiClient.register(formData)
      router.push('/auth/login?registered=true')
    } catch (err) {
      setError('Failed to create account. Please try again.')
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
              <h1 className="text-3xl font-bold text-foreground text-center mb-2">Join DRS Racing</h1>
              <p className="text-muted text-center">Create your racing account</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                {error && <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-md text-sm">{error}</div>}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                    <Input name="first_name" placeholder="John" value={formData.first_name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                    <Input name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Username</label>
                  <Input name="username" placeholder="raceking" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <Input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                  <Input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
                  <Input type="password" name="password_confirm" placeholder="••••••••" value={formData.password_confirm} onChange={handleChange} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
              <p className="text-center text-sm text-muted mt-4">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in here
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
