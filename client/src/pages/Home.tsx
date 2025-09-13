import ParallaxBackground from "@/components/ParallaxBackground";
import Navigation from "@/components/Navigation";
import IntroSection from "@/components/IntroSection";
import ProjectsSection from "@/components/ProjectsSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import QuestsSection from "@/components/QuestsSection";

export default function Home() {
  useEffect(() => {
    document.title = "voxelparrot.dev";
  }, []);
  return (
    <div className="relative min-h-screen" data-testid="home-page">
      <ParallaxBackground />
      <Navigation />

      <main className="relative z-10 content-overlay min-h-screen">
        <IntroSection />
        <FeaturedProjects />
        <ProjectsSection />
        <QuestsSection />
        <Footer />
      </main>
    </div>
  );
}
