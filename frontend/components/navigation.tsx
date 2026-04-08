"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Flag, Trophy, Users, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/races", label: "Races", icon: Calendar },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/championships", label: "Championships", icon: Flag },
  { href: "/drivers", label: "Drivers", icon: Users },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="racing-stripes h-1" />
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center transform -skew-x-6 group-hover:skew-x-0 transition-transform">
                <span className="text-primary-foreground font-bold text-lg transform skew-x-6 group-hover:skew-x-0 transition-transform">
                  DRS
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground tracking-tight leading-none">
                DRS LANE
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Racing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-sm transform -skew-x-3 hover:skew-x-0 transition-transform"
            >
              <span className="inline-block transform skew-x-3 hover:skew-x-0 transition-transform">
                Register
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="mx-4 px-4 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-sm text-center"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
