import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@shared/schema";
import { motion } from "framer-motion";
import LoadingComponent from "@/components/LoadingComponent";
import CardsLoadingComponent from "@/components/CardsLoadingComponent";

// Filter options
const filterfeatured = ["All", "Featured"];
const filtertype = ["Mods", "Modpacks", "Resource Packs", "Website", "Other"];
const filtertags = [];
const filtermods = [
  "Blocks",
  "Equipment",
  "Mobs",
  "Decoration",
  "Progression",
  "Food",
  "Cognata",
];
const filterrps = [
  "Blocks",
  "Equipment",
  "Decoration",
  "Food",
  "Cognata",
];
const filtermisc = [
  "Tool",
  "Font",
  "Game",
  "Guide",
  "Server",
];


export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("Blocks");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  const filterMap: Record<string, string[]> = {
      "Mods": filtermods,
      "Resource Packs": filterrps,
      "Other": filtermisc
  };

  const activeTags = filterMap[selectedCategory] || filtertags;

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

    let filtered = projects;

    if (selectedCategory && selectedCategory !== "All") {
      if (selectedCategory === "Featured") {
        filtered = filtered.filter((p) => p.featured === "true");
      } else if (filtertype.includes(selectedCategory)) {
        switch (selectedCategory) {
          case "Mods":
            filtered = filtered.filter((p) => p.type === "Mod");
            break;
          case "Modpacks":
            filtered = filtered.filter((p) => p.type === "Modpack");
            break;
          case "Resource Packs":
            filtered = filtered.filter((p) => p.type === "Resource Pack");
            break;
          case "Other":
            filtered = filtered.filter((p) => p.tags.includes("Misc"));
            break;
        }
      }
    }

    if (selectedTag && activeTags.includes(selectedTag)) {
      filtered = filtered.filter((p) => p.tags.includes(selectedTag));
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, selectedTag, searchQuery]);



  if (isLoading) {
    return (
        <div>
      <LoadingComponent />
      <CardsLoadingComponent />
      </div>
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
                    className="voxel-text text-2xl md:text-4xl font-bold text-primary mb-6"
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
              className={`px-4 py-2 rounded-lg font-bold text-card voxel-text transition-all duration-300 ease-in-out hover-scale ${
                selectedCategory === category
                  ? "bg-primary text-card shadow-[0_0_15px_hsl(var(--primary-hue)_100%_50%/0.8)]"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_hsl(var(--primary-hue)_9%_70%/0.8)]"
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
              className={`inline-block rounded-lg px-2 transition-all duration-300 ease-in-out hover-scale ${
                selectedCategory === category
                  ? "bg-primary text-card py-0 voxel-text-sm font-bold shadow-[0_0_15px_hsl(var(--primary-hue)_100%_50%/0.8)]"
                  : "text-secondary-foreground py-1 voxel-text-sm hover:bg-secondary hover:shadow-[0_0_15px_hsl(var(--primary-hue)_9%_70%/0.8)]"
              }`}
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
          {activeTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag(selectedTag === tag ? "" : tag)
              }
              className={`px-2 voxel-text-xs transition-all duration-300 ease-in-out hover-scale ${
                selectedTag === tag
                  ? "text-primary font-bold drop-shadow-[0_0_15px_hsl(var(--primary-hue)_100%_50%/0.8)]"
                  : "text-secondary-foreground hover:drop-shadow-[0_0_15px_hsl(var(--primary-hue)_9%_70%)]"
              }`}
              data-testid={`filter-${tag.toLowerCase()}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8"
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
