import ParallaxBackground from "@/components/ParallaxBackground";
import TabsSection from "@/components/TabsSection";
import { useEffect, useState } from "react";
import TabContent from "@/components/TabContent";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home"); // track current tab

  // Set document title
  useEffect(() => {
    document.title = "voxelparrot.dev";
  }, []);

  // Update activeTab from URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveTab(hash);

    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash) setActiveTab(newHash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Optionally, update hash when user changes tabs
  const handleSetActiveTab = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  return (
    <div className="relative min-h-screen" data-testid="home-page">
      <ParallaxBackground />
      <TabsSection activeTab={activeTab} setActiveTab={handleSetActiveTab} />

      <main className="relative z-10 content-overlay min-h-screen">
        <TabContent activeTab={activeTab} setActiveTab={handleSetActiveTab} />
      </main>
    </div>
  );
}
