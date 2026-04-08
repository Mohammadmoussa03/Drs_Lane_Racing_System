import { Metadata } from "next";
import { ChampionshipsList } from "@/components/championships/championships-list";
import { ChampionshipStandings } from "@/components/championships/championship-standings";
import { ChampionshipHero } from "@/components/championships/championship-hero";

export const metadata: Metadata = {
  title: "Championships | DRS Lane Racing",
  description: "Compete in seasonal championships, accumulate points, and fight for the championship crown at DRS Lane Racing.",
};

export default function ChampionshipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ChampionshipHero />
      <ChampionshipStandings />
      <ChampionshipsList />
    </div>
  );
}
