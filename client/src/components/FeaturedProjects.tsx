import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/schema";
import ReactMarkdown from "react-markdown";
import CardsLoadingComponent from "@/components/CardsLoadingComponent"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeaturedProjectsProps {
  setActiveTab: (tabId: string) => void;
}

export default function FeaturedProjects({ setActiveTab }: FeaturedProjectsProps) {
  return (
    <section
      id="featured"
      className="py-10 px-4 sm:px-6 lg:px-8"
      data-testid="skills-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="voxel-text text-xl md:text-2xl font-bold text-primary mb-4"
            data-testid="skills-title"
          >
            Featured Projects
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            data-testid="skills-description"
          >
            Projects I personally like and have recently worked on.
          </p>
        </div>

        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          data-testid="skill-categories"
        >
          <div
            className="bg-card border border-border rounded-lg p-6 hover-lift"
            data-testid="category-a"
          >
            <h3 className="voxel-text text-sm text-primary mb-3 font-bold">
              Particle Timer
            </h3>

            <ul className="text-sm text-muted-foreground space-y-2">
              <a
                href="https://github.com/voxelparrot/particle-timer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out pixel-text mr-2"
                data-testid="link-github"
              >
                Github
              </a>
              <p>A rainbow particle-themed web timer that utilizes a custom particle generation engine built in Scratch.</p>
            </ul>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-6 hover-lift"
            data-testid="category-b"
          >
            <h3 className="voxel-text text-sm text-primary mb-3 font-bold">
              Cognata Remaster
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <a
                href="https://modrinth.com/project/cognata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out pixel-text"
                data-testid="featured-link-modrinth"
              >
                Modrinth
              </a>
              <p>A Minecraft modpack that turns the game into a more difficult and expansive version of itself, having the player found their own civilization.</p>
            </ul>
          </div>

          <div
            className="bg-card border border-border rounded-lg p-6 hover-lift"
            data-testid="category-c"
          >
            <h3 className="voxel-text text-sm text-primary mb-3 font-bold">
              Parrot's Wordle
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <a
                href="https://github.com/voxelparrot/wordle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out pixel-text mr-2"
                data-testid="featured-link-domain"
              >
                Github
              </a>
              <p>A wordle game with polished animations and visuals, mobile support, custom words, and even local storage of stats and records.</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
