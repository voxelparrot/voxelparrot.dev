import IntroSection from "@/components/IntroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProjectsSection from "@/components/ProjectsSection";
import QuestsSection from "@/components/QuestsSection";
import NotFound from "@/components/NotFound";

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
      components: [<IntroSection key="intro-section" setActiveTab={setActiveTab} />, <FeaturedProjects key="featured-projects" setActiveTab={setActiveTab} />],
    },
    {
      id: "projects",
      title: "Projects",
      components: [<ProjectsSection key="projects-section" />],
    },
    {
      id: "cognata",
      title: "Cognata",
      components: [<QuestsSection key="quests-section" />],
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
