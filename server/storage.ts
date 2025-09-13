import {
  type Project,
  type InsertProject,
  type Skill,
  type InsertSkill,
  type Quest,
  type InsertQuest,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  getQuests(): Promise<Quest[]>;
  createQuest(quest: InsertQuest): Promise<Quest>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private skills: Map<string, Skill>;
  private quests: Map<string, Quest>;
  private projectsLoaded: boolean = false;
  private questsLoaded: boolean = false;

  constructor() {
    this.projects = new Map();
    this.skills = new Map();
    this.quests = new Map();
    this.initializeSkills();
  }

  private async loadProjectsFromFiles(): Promise<void> {
    if (this.projectsLoaded) return;

    try {
      const projectsDir = join(process.cwd(), "server", "data", "projects");
      const files = await readdir(projectsDir);
      const jsonFiles = files.filter((file) => file.endsWith(".json"));

      for (const file of jsonFiles) {
        const filePath = join(projectsDir, file);
        const content = await readFile(filePath, "utf-8");
        const projectData = JSON.parse(content);

        // Generate ID from filename (remove .json extension)
        const id = file.replace(".json", "");
        const project: Project = {
          id,
          ...projectData,
        };

        this.projects.set(id, project);
      }

      this.projectsLoaded = true;
    } catch (error) {
      console.error("Error loading projects from files:", error);
      // Fallback to empty projects if file loading fails
      this.projectsLoaded = true;
    }
  }

  private async loadQuestsFromFiles(): Promise<void> {
    if (this.questsLoaded) return;

    try {
      const questsDir = join(process.cwd(), "server", "data", "quests");
      const files = await readdir(questsDir);
      const jsonFiles = files.filter((file) => file.endsWith(".json"));

      for (const file of jsonFiles) {
        const filePath = join(questsDir, file);
        const content = await readFile(filePath, "utf-8");
        const questData = JSON.parse(content);

        const id = file.replace(".json", "");
        const quest: Quest = { id, ...questData };

        this.quests.set(id, quest);
      }

      this.questsLoaded = true;
    } catch (error) {
      console.error("Error loading quests from files:", error);
      this.questsLoaded = true;
    }
  }

  private initializeSkills() {
    const initialSkills: Skill[] = [
      { id: "1", name: "Java", icon: "fab fa-java", category: "Programming" },
      { id: "2", name: "Forge", icon: "fas fa-code", category: "Framework" },
      { id: "3", name: "Fabric", icon: "fas fa-cubes", category: "Framework" },
      { id: "4", name: "Git", icon: "fab fa-git-alt", category: "Tools" },
      { id: "5", name: "MCP", icon: "fas fa-tools", category: "Tools" },
      { id: "6", name: "Gradle", icon: "fas fa-box", category: "Build" },
    ];

    initialSkills.forEach((skill) => {
      this.skills.set(skill.id, skill);
    });
  }

  async getProjects(): Promise<Project[]> {
    await this.loadProjectsFromFiles();
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    await this.loadProjectsFromFiles();
    return Array.from(this.projects.values()).filter(
      (project) => project.featured === "true",
    );
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    await this.loadProjectsFromFiles();
    return Array.from(this.projects.values()).filter(
      (project) => project.category.toLowerCase() === category.toLowerCase(),
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    await this.loadProjectsFromFiles();
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getQuests(): Promise<Quest[]> {
    await this.loadQuestsFromFiles();
    return Array.from(this.quests.values());
  }

  async createQuest(insertQuest: InsertQuest): Promise<Quest> {
    await this.loadQuestsFromFiles();
    const id = randomUUID();
    const quest: Quest = { ...insertQuest, id };
    this.quests.set(id, quest);
    return quest;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      (skill) => skill.category.toLowerCase() === category.toLowerCase(),
    );
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }
}

export const storage = new MemStorage();
