import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md"
          : "bg-card/90 backdrop-blur-md",
        "border-b border-border",
      )}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setLocation("/")}
              className="pixel-text text-primary text-sm hover:text-accent transition-all"
              data-testid="logo"
            >
              voxelparrot
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("projects")}
                className="text-foreground hover:text-accent transition-all"
                data-testid="nav-featured"
              >
                Cognata Guide
              </button>
              <button
                onClick={() => setLocation("/")}
                className="text-foreground hover:text-accent transition-all"
                data-testid="nav-home"
              >
                Home
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-accent"
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-md"
            data-testid="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("quests")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-accent transition-all"
                data-testid="mobile-nav-guide"
              >
                Cognata Guide
              </button>
              <button
                onClick={() => setLocation("/")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-accent transition-all"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
