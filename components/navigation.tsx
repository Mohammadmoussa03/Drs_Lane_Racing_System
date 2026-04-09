"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  Flag, 
  Trophy, 
  Calendar, 
  User, 
  Menu, 
  X, 
  Gauge,
  Medal,
  Bell
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Dashboard", href: "/", icon: Gauge },
  { name: "Races", href: "/races", icon: Flag },
  { name: "Championships", href: "/championships", icon: Trophy },
  { name: "Leaderboard", href: "/leaderboard", icon: Medal },
  { name: "Schedule", href: "/schedule", icon: Calendar },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-lg gradient-gold opacity-80" />
              <Flag className="relative h-5 w-5 text-background" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-foreground">
                DRS LANE
              </span>
              <span className="ml-2 text-sm font-medium text-gold">RACING</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-racing-red pulse-live" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
            </Button>

            <Button className="hidden sm:flex gradient-gold text-background font-semibold hover:opacity-90">
              Book Race
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card border-border">
                <div className="flex flex-col gap-6 pt-8">
                  <div className="flex items-center gap-3 px-2">
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      <div className="absolute inset-0 rounded-lg gradient-gold opacity-80" />
                      <Flag className="relative h-6 w-6 text-background" />
                    </div>
                    <div>
                      <span className="text-xl font-bold tracking-tight text-foreground">
                        DRS LANE
                      </span>
                      <span className="ml-2 text-sm font-medium text-gold">RACING</span>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col gap-1">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="border-t border-border pt-6">
                    <Button className="w-full gradient-gold text-background font-semibold hover:opacity-90">
                      Book Race
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Racing stripe accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </header>
  )
}
