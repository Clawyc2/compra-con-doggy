import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { TeamSection } from "@/components/TeamSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#050d1f" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <AdvantagesSection />
      <TeamSection />
    </main>
  );
}
