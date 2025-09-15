import ParallaxBackground from "@/components/ParallaxBackground";
import Navigation from "@/components/Navigation";
import IntroSection from "@/components/IntroSection";
import ProjectsSection from "@/components/ProjectsSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import TabsSection from "@/components/TabsSection";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import QuestsSection from "@/components/QuestsSection";
import TabContent from "@/components/TabContent";

export default function Home() {
  useEffect(() => {
    document.title = "voxelparrot.dev";
  }, []);

  const [activeTab, setActiveTab] = useState("home"); // keep track of current tab

  return (
    <div className="relative min-h-screen" data-testid="home-page">
      <ParallaxBackground />
      <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative z-10 content-overlay min-h-screen">
        <TabContent activeTab={activeTab} setActiveTab={setActiveTab} />
        <Footer />
      </main>
    </div>
  );
}
