import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

/**
 * Registers API routes for local development.
 * These routes are NOT used on static deployments (e.g., GitHub Pages).
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // --- Projects ---
  app.get("/api/projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (_req: Request, res: Response) => {
    try {
      const featured = await storage.getFeaturedProjects();
      res.json(featured);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  app.get(
    "/api/projects/category/:category",
    async (req: Request, res: Response) => {
      try {
        const projects = await storage.getProjectsByCategory(
          req.params.category,
        );
        res.json(projects);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Failed to fetch projects by category" });
      }
    },
  );

  // --- Quests ---
  app.get("/api/quests", async (_req: Request, res: Response) => {
    try {
      const quests = await storage.getQuests();
      res.json(quests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch quests" });
    }
  });

  // --- Skills ---
  app.get("/api/skills", async (_req: Request, res: Response) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Create and return HTTP server
  return createServer(app);
}
