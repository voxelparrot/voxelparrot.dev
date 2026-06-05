import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IntroSectionProps {
  setActiveTab: (tabId: string) => void;
}

export default function IntroSection({ setActiveTab }: IntroSectionProps) {

  return (
    <section
      id="about"
      className="pt-28 px-4 sm:px-6 lg:px-8"
      data-testid="intro-section"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.img
          className="mx-auto mb-6 tint-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="intro-title"
          src="/assets/elloello.png"
          alt="Hello"
        />

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="intro-description"
        >
          I'm voxelparrot, an artist, modeler, and programmer.{" "}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
                  onClick={() => setActiveTab("projects")}
            className="bg-primary text-card px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 ease-in-out pixel-text hover-scale hover:shadow-[0_0_15px_hsl(var(--primary-hue)_100%_50%/0.8)]"
            data-testid="button-browse-projects"
          >
            Browse Projects
          </button>
          <a
            href="https://github.com/voxelparrot"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border text-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out inline-block hover-scale pixel-text hover:shadow-[0_0_15px_hsl(var(--primary-hue)_9%_70%/0.8)]"
            data-testid="link-github"
          >
            View GitHub
          </a>
          <div className="flex items-center justify-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://voxelparrot.github.io/particle-timer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 ease-in-out inline-block hover-scale pixel-text items-center justify-center cursor-pointer hover:drop-shadow-[0_0_10px_hsl(149_91%_53%/0.8)]"
                  data-testid="link-timer"
                >
                  <img
                    src={`/assets/particle_icon.png`}
                    alt="Particle Timer Icon"
                    className="w-13 h-13 min-w-[51px] shrink-0 object-cover image-pixelated objects-center"
                    data-testid={`img-particle-icon`}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Particle Timer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://scratch.mit.edu/studios/51065058"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 ease-in-out inline-block hover-scale pixel-text items-center justify-center cursor-pointer hover:drop-shadow-[0_0_10px_hsl(210_98%_70%/0.8)]"
                  data-testid="link-scratch"
                >
                  <img
                    src={`/assets/scratch_icon.png`}
                    alt="Scratch Icon"
                    className="w-13 h-13 min-w-[51px] shrink-0 object-cover image-pixelated objects-center"
                    data-testid={`img-scratch-icon`}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Scratch Projects</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://voxelparrot.github.io/wordle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 ease-in-out inline-block hover-scale pixel-text items-center justify-center cursor-pointer hover:drop-shadow-[0_0_10px_hsl(150_98%_90%/0.8)]"
                  data-testid="link-wordle"
                >
                  <img
                    src={`/assets/wordle_icon.png`}
                    alt="Wordle Icon"
                    className="w-13 h-13 min-w-[51px] shrink-0 object-cover image-pixelated objects-center"
                    data-testid={`img-wordle-icon`}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Parrot's Wordle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://voxelparrot.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 ease-in-out inline-block hover-scale pixel-text items-center justify-center cursor-pointer hover:drop-shadow-[0_0_10px_hsl(10_80%_70%/0.8)]"
                  data-testid="link-parrot"
                >
                  <img
                    src={`/assets/minipartot.png`}
                    alt="parrot"
                    className="w-12 h-12 min-w-[51px] shrink-0 object-cover image-pixelated objects-center"
                    data-testid={`img-parrot-icon`}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>go here again? i guess i just wanted to put a parrot here</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 justify-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://modrinth.com/user/voxelparrot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-primary hover:text-card transition-all duration-300 ease-in-out pixel-text hover:shadow-[0_0_15px_hsl(var(--primary-hue)_100%_50%/0.8)]"
            data-testid="link-modrinth"
          >
            Modrinth
          </a>
          <a
            href="https://www.curseforge.com/members/voxelparrot/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-primary hover:text-card transition-all duration-300 ease-in-out pixel-text hover:shadow-[0_0_15px_hsl(var(--primary-hue)_100%_50%/0.8)]"
            data-testid="link-curseforge"
          >
            CurseForge
          </a>
        </motion.div>
      </div>
    </section>
  );
}
