'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: number
  first_name: string
  last_name: string
  email: string
  driver?: {
    points: number
    tier: string
    preferred_kart_class: string
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/users/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data)
        setFormData({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
        })
      }
    } catch (err) {
      console.log('[v0] Error fetching user profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/users/profile/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      })

      if (response.ok) {
        setEditing(false)
        fetchUserProfile()
      }
    } catch (err) {
      console.log('[v0] Error updating profile:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your racing profile and preferences</p>
      </div>

      {/* Profile Information */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
          <Button
            variant={editing ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editing) {
                handleSave()
              } else {
                setEditing(true)
              }
            }}
            className={editing ? 'bg-accent' : ''}
          >
            {editing ? 'Save' : 'Edit'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">First Name</label>
            <div className={editing ? '' : 'p-3 bg-muted rounded'}>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                readOnly={!editing}
                className={!editing ? 'bg-transparent border-0' : ''}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Last Name</label>
            <div className={editing ? '' : 'p-3 bg-muted rounded'}>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                readOnly={!editing}
                className={!editing ? 'bg-transparent border-0' : ''}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <div className="p-3 bg-muted rounded">
            <Input
              value={formData.email}
              readOnly
              className="bg-transparent border-0"
            />
          </div>
          <p className="text-xs text-muted-foreground">Email cannot be changed</p>
        </div>
      </Card>

      {/* Racing Stats */}
      {user?.driver && (
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Racing Profile</h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Driver Tier</p>
              <Badge variant="default" className="w-fit bg-accent text-background">
                {user.driver.tier}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold text-foreground">{user.driver.points}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Preferred Class</p>
              <p className="text-lg font-semibold text-foreground">{user.driver.preferred_kart_class}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Preferences */}
      <Card className="p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">Preferences</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified about races and achievements</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <div>
              <p className="font-medium text-foreground">Race Reminders</p>
              <p className="text-sm text-muted-foreground">Remind me before upcoming races</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <div>
              <p className="font-medium text-foreground">Show in Leaderboard</p>
              <p className="text-sm text-muted-foreground">Make my profile visible to other drivers</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="p-6 space-y-4 border-destructive/30">
        <h2 className="text-xl font-bold text-foreground">Account</h2>
        
        <Button
          variant="outline"
          className="w-full h-10 border-destructive/30 text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          Sign Out
        </Button>

        <Button
          variant="outline"
          className="w-full h-10 border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          Delete Account
        </Button>
      </Card>
    </div>
  )
}
