import IntroSection from "@/components/IntroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProjectsSection from "@/components/ProjectsSection";
import QuestsSection from "@/components/QuestsSection";
import ThemeSection from "@/components/ThemeSection";
import NotFound from "@/components/NotFound";
import Footer from "@/components/Footer";

interface TabContentProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

interface Tab {
  id: string;
  title: string;
  components: React.ReactNode[];
}

export default function TabContent({ activeTab, setActiveTab }: TabContentProps) {
  const tabs: Tab[] = [
    {
      id: "home",
      title: "Home",
      components: [<IntroSection key="intro-section" setActiveTab={setActiveTab} />, <FeaturedProjects key="featured-projects" setActiveTab={setActiveTab} />, <Footer key="home-footer" />],
    },
    {
      id: "projects",
      title: "Projects",
      components: [<ProjectsSection key="projects-section" />, <Footer key="projects-footer" />],
    },
    {
      id: "cognata",
      title: "Cognata",
      components: [<QuestsSection key="quests-section" />, <Footer key="cognata-footer" />],
    },
    {
      id: "theme",
      title: "Theme",
      components: [<ThemeSection key="theme-section" />],
    },
  ];

  // Find the current tab
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  if (!currentTab) {
    // If the tab doesn’t exist, render NotFound
    return <NotFound setActiveTab={setActiveTab} />;
  }

  // Render its components
  return <>{currentTab?.components}</>;
}
