import { 
  Timer, Trophy, BarChart3, Calendar, 
  Shield, Zap, Award, Users 
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book your race slot in seconds. Choose from practice, qualifying, or Grand Prix sessions.",
  },
  {
    icon: Timer,
    title: "Live Timing",
    description: "Track your lap times in real-time. See sector splits and compare against the competition.",
  },
  {
    icon: BarChart3,
    title: "Performance Stats",
    description: "Detailed analytics on your racing performance. Identify areas to improve your pace.",
  },
  {
    icon: Trophy,
    title: "Championships",
    description: "Compete in seasonal championships. Accumulate points across multiple races.",
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Unlock badges and achievements as you progress. Earn rewards for your accomplishments.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a thriving community of racing enthusiasts. Make friends and find rivals.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Professional safety equipment and trained marshals ensure a secure racing environment.",
  },
  {
    icon: Zap,
    title: "Pro Equipment",
    description: "Race on professional-grade karts with the latest technology and performance specs.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            EVERYTHING YOU NEED TO
            <br />
            <span className="text-primary">RACE & COMPETE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            From casual practice sessions to intense championship battles, 
            DRS Lane Racing provides the complete competitive karting experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-background rounded-sm border border-border hover:border-primary/50 transition-all"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
