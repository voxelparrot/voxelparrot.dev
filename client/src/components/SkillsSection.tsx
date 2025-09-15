import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";
import LoadingComponent from "@/components/LoadingComponent";

export default function SkillsSection() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  if (isLoading) {
    return (
      <LoadingComponent />
    );
  }

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8"
      data-testid="skills-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="pixel-text text-xl md:text-2xl font-bold text-primary mb-4"
            data-testid="skills-title"
          >
            Technical Skills
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            data-testid="skills-description"
          >
            Expertise in modding frameworks, development tools, and community
            management
          </p>
        </div>

        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          data-testid="skill-categories"
        >
          <div
            className="bg-card border border-border rounded-lg p-6 hover-lift"
            data-testid="category-mod-development"
          >
            <h3 className="pixel-text text-sm font-bold text-primary mb-3">
              Mod Development
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Custom item and block creation</li>
              <li>• Advanced recipe systems</li>
              <li>• Entity and AI programming</li>
              <li>• Cross-compatibility testing</li>
            </ul>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-6 hover-lift"
            data-testid="category-modpack-design"
          >
            <h3 className="pixel-text text-sm font-bold text-primary mb-3">
              Modpack Design
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Balanced progression systems</li>
              <li>• Performance optimization</li>
              <li>• Quest and achievement design</li>
              <li>• Community feedback integration</li>
            </ul>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-6 hover-lift"
            data-testid="category-community-management"
          >
            <h3 className="pixel-text text-sm font-bold text-primary mb-3">
              Community Management
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Discord server administration</li>
              <li>• Bug report handling</li>
              <li>• Documentation writing</li>
              <li>• User support and tutorials</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
