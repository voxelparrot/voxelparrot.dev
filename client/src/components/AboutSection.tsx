import { motion } from "framer-motion";
import { Github, Download } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8" data-testid="about-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="pixel-text text-xl md:text-2xl font-bold text-primary mb-6" data-testid="about-title">
              About the Developer
            </h2>
            
            <div className="space-y-4 text-muted-foreground" data-testid="about-content">
              <p>
                hihi
              </p>
              <p>
                hihihi
              </p>
              <p>
                am parrot
              </p>
            </div>
            
            <div className="mt-8 flex gap-4" data-testid="about-links">
              <a
                href="https://github.com/voxelparrot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center gap-2"
                data-testid="link-github-about"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://modrinth.com/user/voxelparrot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center gap-2"
                data-testid="link-modrinth-about"
              >
                <Download className="w-4 h-4" />
                Modrinth
              </a>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="about-image"
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
}
