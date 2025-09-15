import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@shared/schema";
import { motion } from "framer-motion";

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
  const [searchQuery, setSearchQuery] = useState("");

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

    // Start with all projects
    let filtered = projects;

    // Category / type / tag filtering
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((p) => {
        // Featured
        if (selectedCategory === "Featured") return p.featured === "true";

        // Type filters
        if (filtertype.includes(selectedCategory)) {
          switch (selectedCategory) {
            case "Mods":
              return p.type === "Mod";
            case "Modpacks":
              return p.type === "Modpack";
            case "Resource Packs":
              return p.type === "Resource Pack";
            case "Other":
              return p.tags.includes("Misc");
          }
        }

        // Tag filters
        if (filtertags.includes(selectedCategory)) {
          return p.tags.includes(selectedCategory);
        }

        return true;
      });
    }

    // Search filtering (applied after category/tag filter)
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchQuery]);


  if (isLoading) {
    return (
      <section
        id="projects"
        className="pt-28 px-4 sm:px-6 lg:px-8"
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
      className="pt-28 px-4 sm:px-6 lg:px-8"
      data-testid="projects-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
                    className="pixel-text text-2xl md:text-4xl font-bold text-primary mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    data-testid="projects-title"
                  >
                    Projects
                  </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
            data-testid="projects-description"
          >
            Filter Projects by Type, Category, Tag, or Search
          </motion.p>
        </div>

        
        {/* Search Box */}
        <div className="flex justify-center mb-6 relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-72 rounded-lg border border-gray-400 pixel-text bg-secondary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="relative right-8 text-accent-500 hover-scale-big"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
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
