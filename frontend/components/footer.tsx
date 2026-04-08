import Link from "next/link";
import { Flag, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center transform -skew-x-6">
                <span className="text-primary-foreground font-bold text-lg transform skew-x-6">
                  DRS
                </span>
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
            <p className="text-sm text-muted-foreground">
              Experience the thrill of competitive karting. Race, compete, and climb the leaderboard.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Racing
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/races" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Upcoming Races
                </Link>
              </li>
              <li>
                <Link href="/championships" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Championships
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Race Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 DRS Lane Racing. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div className="racing-stripes h-1" />
    </footer>
  );
}
