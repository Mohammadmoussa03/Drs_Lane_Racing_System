"use client"

import Link from "next/link"
import { Flag, Instagram, Twitter, Youtube, Facebook } from "lucide-react"

const navigation = {
  racing: [
    { name: "Book a Race", href: "/races" },
    { name: "Championships", href: "/championships" },
    { name: "Leaderboards", href: "/leaderboard" },
    { name: "Schedule", href: "/schedule" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Track", href: "/track" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Safety Guidelines", href: "/safety" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
}

const social = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "YouTube", href: "#", icon: Youtube },
  { name: "Facebook", href: "#", icon: Facebook },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="absolute inset-0 rounded-lg gradient-gold opacity-80" />
                  <Flag className="relative h-5 w-5 text-background" />
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight text-foreground">
                    DRS LANE
                  </span>
                  <span className="ml-2 text-sm font-medium text-gold">RACING</span>
                </div>
              </Link>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
                Experience the thrill of professional karting at our state-of-the-art facility. 
                Join the elite and compete for glory.
              </p>
              <div className="mt-6 flex items-center gap-4">
                {social.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Racing */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Racing
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.racing.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DRS Lane Racing. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Powered by</span>
              <span className="font-semibold text-gold">Premium Racing Tech</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
