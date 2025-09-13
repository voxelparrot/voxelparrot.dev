import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="pixel-text text-2xl md:text-4xl font-bold text-primary mb-6 animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="hero-title"
        >
          Hello
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="hero-description"
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
            onClick={() => scrollToSection("projects")}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 ease-in-out pixel-text hover-scale"
            data-testid="button-browse-projects"
          >
            Browse Projects
          </button>
          <a
            href="https://github.com/voxelparrot"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border text-foreground px-8 py-3 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out inline-block hover-scale pixel-text"
            data-testid="link-github"
          >
            View GitHub
          </a>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  onClick={() => scrollToSection("quests")}
                  className="transition-all duration-300 ease-in-out inline-block hover-scale pixel-text flex items-center justify-center cursor-pointer"
                  data-testid="link-github"
                >
                  <img
                    src={`/assets/cognata_icon.png`}
                    alt="Cognata Icon"
                    className="w-13 h-13 min-w-[51px] shrink-0 object-cover image-pixelated objects-center"
                    data-testid={`img-cognata-icon`}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Cognata Guide</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
            className="text-xs bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out pixel-text"
            data-testid="link-modrinth"
          >
            Modrinth
          </a>
          <a
            href="https://www.curseforge.com/members/parrot/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out pixel-text"
            data-testid="link-curseforge"
          >
            CurseForge
          </a>
        </motion.div>
      </div>
    </section>
  );
}
