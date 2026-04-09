"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ElementType;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function StatsCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  icon: Icon,
  duration = 2000,
  decimals = 0,
  className,
}: StatsCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  const animateValue = () => {
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (value - startValue) * easeOutQuart;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      {Icon && (
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      <div className="font-mono text-4xl font-bold text-foreground mb-1">
        {prefix}
        {Number(formattedValue).toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

// Slot machine style counter for dramatic reveals
export function SlotMachineCounter({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [digits, setDigits] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const valueStr = value.toString();
    setDigits(valueStr.split("").map(Number));
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {digits.map((digit, index) => (
        <div
          key={index}
          className="relative w-12 h-16 bg-muted rounded-sm overflow-hidden"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center text-3xl font-bold font-mono transition-transform duration-500",
              revealed ? "translate-y-0" : "-translate-y-full"
            )}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {digit}
          </div>
        </div>
      ))}
    </div>
  );
}
