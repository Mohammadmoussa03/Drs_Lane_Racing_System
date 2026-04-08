import { Timer, Users, Flag, Gauge } from "lucide-react";

const stats = [
  {
    icon: Timer,
    value: "15+",
    label: "Race Types",
    description: "Practice, Qualifying & Grand Prix",
  },
  {
    icon: Users,
    value: "12",
    label: "Drivers Per Race",
    description: "Competitive grid sizes",
  },
  {
    icon: Flag,
    value: "4",
    label: "Championships",
    description: "Annual championship series",
  },
  {
    icon: Gauge,
    value: "70km/h",
    label: "Top Speed",
    description: "Professional-grade karts",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group p-6 bg-background rounded-sm border border-border hover:border-primary/50 transition-colors"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-sm group-hover:border-primary/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
