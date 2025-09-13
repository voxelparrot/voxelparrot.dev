import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";

export default function SkillsSection() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  if (isLoading) {
    return (
      <section
        id="skills"
        className="py-16 px-4 sm:px-6 lg:px-8"
        data-testid="skills-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
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
            Links
          </h2>
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
            className="bg-card border border-border rounded-lg p-2 hover-lift"
            data-testid="category-modpack-design"
          >
            <div className="relative w-full max-w-md" style={{ paddingTop: "142%" }}>
              <iframe
                src="https://modrinth.com/mod/clay-figure/embed"
                className="absolute top-0 left-0 w-full h-full"
                allowTransparency={true}
                frameBorder={0}
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              />
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-2 hover-lift"
            data-testid="category-community-management"
          >
            <div className="relative w-full max-w-md" style={{ paddingTop: "142%" }}>
              <iframe
                src="https://discord.com/widget?id=1307129863576092783&theme=dark"
                className="absolute top-0 left-0 w-full h-full"
                allowTransparency={true}
                frameBorder={0}
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
