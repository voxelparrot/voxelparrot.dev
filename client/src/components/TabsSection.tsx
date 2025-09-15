import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectsSection from "@/components/ProjectsSection";
import QuestsSection from "@/components/QuestsSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import IntroSection from "@/components/IntroSection";

interface Tab {
  id: string;
  title: string;
}

interface TabsSectionProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function TabsSection({ activeTab, setActiveTab }: TabsSectionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const tabs: Tab[] = [
    { id: "home", title: "Home" },
    { id: "projects", title: "Projects" },
    { id: "cognata", title: "Cognata" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/95 backdrop-blur-md" : "bg-card/90 backdrop-blur-md",
        "border-b border-border"
      )}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("home")}
              className="pixel-text text-primary text-sm hover:text-accent transition-all hover-scale"
              data-testid="logo"
            >
              voxelparrot
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`text-foreground hover:text-accent transition-all hover-scale ${
                    activeTab === tab.id ? "glow-effect-class" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-accent"
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`block w-full text-left px-3 py-2 text-foreground hover:text-accent transition-all hover-scale ${
                    activeTab === tab.id ? "glow-effect-class" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
