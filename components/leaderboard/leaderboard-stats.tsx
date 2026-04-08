import { Users, Trophy, Timer, Flag } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "847",
    label: "Registered Drivers",
    change: "+23 this week",
    changePositive: true,
  },
  {
    icon: Trophy,
    value: "156",
    label: "Total Wins Awarded",
    change: "+12 this month",
    changePositive: true,
  },
  {
    icon: Timer,
    value: "0:52.341",
    label: "All-Time Track Record",
    change: "VELOCITY_X",
    changePositive: true,
  },
  {
    icon: Flag,
    value: "2,487",
    label: "Races Completed",
    change: "+89 this week",
    changePositive: true,
  },
];

export function LeaderboardStats() {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-sm p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {stat.label}
              </div>
              <div className={`text-xs font-medium ${stat.changePositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
