"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Flag,
  Trophy,
  Users,
  BarChart3,
  Bell,
  Menu,
  X,
  LogIn,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface HeaderProps {
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture?: string;
  } | null;
  notificationCount?: number;
}

const navigation = [
  { name: "Races", href: "/races", icon: Flag },
  { name: "Leaderboard", href: "/leaderboard", icon: BarChart3 },
  { name: "Championships", href: "/championships", icon: Trophy },
  { name: "Drivers", href: "/drivers", icon: Users },
];

export function Header({ user, notificationCount = 0 }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center skew-button">
              <span className="text-xl font-bold text-white">D</span>
            </div>
            <span className="text-xl font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
              DRS Lane
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "gap-2",
                      isActive && "bg-primary/10 text-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Notifications */}
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                        {notificationCount > 9 ? "9+" : notificationCount}
                      </span>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-sm hover:bg-muted transition-colors"
                  >
                    <Avatar
                      src={user.profile_picture}
                      fallback={`${user.first_name} ${user.last_name}`}
                      size="sm"
                    />
                    <span className="hidden sm:block font-medium">
                      {user.first_name}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-sm shadow-lg py-1 z-50">
                        <Link
                          href={`/drivers/${user.id}`}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>My Profile</span>
                          </div>
                        </Link>
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span>Dashboard</span>
                          </div>
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span>Settings</span>
                          </div>
                        </Link>
                        <hr className="my-1 border-border" />
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            // Handle logout
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-error"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button skewed>
                    <span>Get Started</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
