"use client";

import Link from "next/link";
import { ArrowRight, Play, Zap, Trophy, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        {/* Animated racing grid */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        {/* Glowing accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Season 2026 Now Open</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">PUSH YOUR</span>
            <br />
            <span className="text-primary">LIMITS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
            Experience the ultimate karting competition at DRS Lane Racing. 
            Book races, track your performance, and compete for championship glory.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/races"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-sm transform -skew-x-3 hover:skew-x-0 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="inline-block transform skew-x-3 group-hover:skew-x-0 transition-transform">
                Book a Race
              </span>
              <ArrowRight className="w-5 h-5 transform skew-x-3 group-hover:skew-x-0 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/about"
              className="group flex items-center gap-2 px-8 py-4 bg-secondary text-foreground font-medium text-lg rounded-sm hover:bg-secondary/80 transition-colors"
            >
              <Play className="w-5 h-5" />
              Watch Highlights
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-card rounded-sm flex items-center justify-center border border-border">
                <Trophy className="w-6 h-6 text-gold" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">2,500+</div>
                <div className="text-sm text-muted-foreground">Races Completed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-card rounded-sm flex items-center justify-center border border-border">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">0:52.341</div>
                <div className="text-sm text-muted-foreground">Track Record</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-card rounded-sm flex items-center justify-center border border-border">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">850+</div>
                <div className="text-sm text-muted-foreground">Active Drivers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom racing stripe accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="racing-stripes h-1" />
      </div>
    </section>
  );
}
