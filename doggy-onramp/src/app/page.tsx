import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { TokenomicsSection } from "@/components/TokenomicsSection";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#050d1f" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <AdvantagesSection />
      <TokenomicsSection />
      <TeamSection />
      <Footer />
    </main>
  );
}
