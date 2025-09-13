import ParallaxBackground from "@/components/ParallaxBackground";
import CognataNavigation from "@/components/CognataNavigation";
import QuestsSection from "@/components/QuestsSection";
import CognataLinks from "@/components/CognataLinks";
import { useEffect } from "react";

export default function CognataGuide() {
  useEffect(() => {
    document.title = "Cognata Guide";
  }, []);
  return (
    <div className="relative min-h-screen" data-testid="cognata">
      <ParallaxBackground />
      <CognataNavigation />

      <main className="relative z-10 content-overlay min-h-screen">
        <QuestsSection />
      </main>
    </div>
  );
}
