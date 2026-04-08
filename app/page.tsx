import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { UpcomingRaces } from "@/components/home/upcoming-races";
import { TopDrivers } from "@/components/home/top-drivers";
import { FeaturesSection } from "@/components/home/features-section";
import { ChampionshipBanner } from "@/components/home/championship-banner";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <UpcomingRaces />
      <TopDrivers />
      <ChampionshipBanner />
      <FeaturesSection />
    </div>
  );
}
