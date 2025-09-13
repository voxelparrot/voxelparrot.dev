import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@shared/schema";

// Filter options
const filterfeatured = ["All", "Featured"];
const filtertype = ["Mods", "Modpacks", "Resource Packs", "Website", "Other"];
const filtertags = [
  "Blocks",
  "Equipment",
  "Mobs",
  "Decoration",
  "Progression",
  "Food",
  "Cognata",
];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const indexRes = await fetch("/data/projects.json");
        const projectFiles: string[] = await indexRes.json();

        const projectData = await Promise.all(
          projectFiles.map((file) =>
            fetch(`/data/projects/${file}.json`).then((res) => res.json()),
          ),
        );

        setProjects(projectData.flat());
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!projects.length) return;

    let filtered: Project[] = [];

    switch (selectedCategory) {
      case "All":
        filtered = projects;
        break;
      case "Mods":
        filtered = projects.filter((p) => p.type === "Mod");
        break;
      case "Modpacks":
        filtered = projects.filter((p) => p.type === "Modpack");
        break;
      case "Resource Packs":
        filtered = projects.filter((p) => p.type === "Resource Pack");
        break;
      case "Other":
        filtered = projects.filter((p) => p.tags.includes("Misc"));
        break;
      case "Featured":
        filtered = projects.filter((p) => p.featured === "true");
        break;
      default:
        if (filtertags.includes(selectedCategory)) {
          filtered = projects.filter((p) => p.tags.includes(selectedCategory));
        } else {
          filtered = projects.filter((p) => p.category === selectedCategory);
        }
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory]);

  if (isLoading) {
    return (
      <section
        id="projects"
        className="py-16 px-4 sm:px-6 lg:px-8"
        data-testid="projects-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-16 px-4 sm:px-6 lg:px-8"
      data-testid="projects-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="pixel-text text-xl md:text-2xl font-bold text-primary mb-4"
            data-testid="projects-title"
          >
            Projects
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            data-testid="projects-description"
          >
            yes
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-4"
          data-testid="project-filters"
        >
          {filterfeatured.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg text-sm pixel-text transition-all duration-300 ease-in-out hover-scale ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Type Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-4"
          data-testid="project-filters"
        >
          {filtertype.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border border-border text-foreground pixel-text px-4 py-2 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out inline-block hover-scale`}
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tag Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
          data-testid="project-filters"
        >
          {filtertags.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-foreground px-2 py-1 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out inline-block hover-scale`}
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-testid="projects-grid"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-12" data-testid="no-projects">
            <p className="text-muted-foreground">
              No projects found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
