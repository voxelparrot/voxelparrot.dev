import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind "sm" breakpoint
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="bg-card border border-border rounded-lg overflow-hidden hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`card-project-${project.id}`}
    >
      <img
        src={`/assets/project/${project.imageUrl}`}
        alt={project.name}
        className="w-full h-48 object-cover"
        data-testid={`img-project-${project.id}`}
      />

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="pixel-text text-xs bg-accent text-accent-foreground px-2 py-1 rounded"
            data-testid={`tag-type-${project.id}`}
          >
            {project.type}
          </span>
          <span
            className="text-xs text-muted-foreground"
            data-testid={`tag-category-${project.id}`}
          >
            {project.tags?.[0]}
          </span>
        </div>

        <h3
          className="text-xl font-bold mb-2"
          data-testid={`title-project-${project.id}`}
        >
          {project.name}
        </h3>

        <p
          className="text-muted-foreground text-sm mb-4 line-clamp-3 min-h-[calc(1.25rem*3)]"
          data-testid={`description-project-${project.id}`}
        >
          {project.description}
        </p>

        <div className="flex gap-2 mb-4">
          {project.links.play && (
            <a
              href={project.links.play}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out inline-flex items-center gap-1"
              data-testid={`link-github-${project.id}`}
            >
              Play <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.links.modrinth && (
            <a
              href={project.links.modrinth}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out inline-flex items-center gap-1"
              data-testid={`link-modrinth-${project.id}`}
            >
              Modrinth <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.links.curseforge && (
            <a
              href={project.links.curseforge}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out inline-flex items-center gap-1"
              data-testid={`link-curseforge-${project.id}`}
            >
              CurseForge <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out inline-flex items-center gap-1"
              data-testid={`link-github-${project.id}`}
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.version && (
            <span
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
              data-testid={`version-${project.id}`}
            >
              {project.version}
            </span>
          )}
          {project.modCount && (
            <span
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
              data-testid={`mod-count-${project.id}`}
            >
              {project.modCount}
            </span>
          )}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition-all duration-300 ease-in-out hover-lift"
          data-testid={`button-view-details-${project.id}`}
        >
          View Details
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pixel-text text-xl text-primary">
              {project.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <img
              src={`/assets/project/${project.imageUrl}`}
              alt={project.name}
              className="w-full h-64 object-cover rounded-lg"
            />

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="pixel-text text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                {project.type}
              </span>

              {isMobile
                ? project.tags?.length > 0 && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {project.tags[0]}
                    </span>
                  )
                : project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
              {project.version && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                  {project.version}
                </span>
              )}
              {project.modCount && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                  {project.modCount}
                </span>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.extendedDescription || project.description}
                </ReactMarkdown>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">External Links</h3>
              <div className="flex flex-wrap gap-3">
                {project.links.play && (
                  <a
                    href={project.links.play}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-all duration-300 ease-in-out inline-flex items-center gap-2"
                  >
                    <span>Play Game</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.links.none && (
                  <a
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm mb-4"
                  >
                    <span>No Exteral Links</span>
                  </a>
                )}
                {project.links.modrinth && (
                  <a
                    href={project.links.modrinth}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-all duration-300 ease-in-out inline-flex items-center gap-2"
                  >
                    <span>Download on Modrinth</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.links.curseforge && (
                  <a
                    href={project.links.curseforge}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-all duration-300 ease-in-out inline-flex items-center gap-2"
                  >
                    <span>Download on CurseForge</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out inline-flex items-center gap-2"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
