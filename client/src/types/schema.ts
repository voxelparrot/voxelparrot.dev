import { z } from "zod";


export interface Project {
  id: string;
  name: string;
  description: string;
  extendedDescription?: string;
  category: string;
  type: string; // "mod", "modpack"
  imageUrl: string;
  links: {
    modrinth?: string;
    none?: string;
    curseforge?: string;
    github?: string;
    play?: string;
    visit?: string;
  };
  tags: string[];
  version?: string;
  modCount?: string;
  featured: string; // "true" or "false"
}

export interface Quest {
  id: string;
  triggers: Array<{
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
    fifth?: string;
  }>;
  title?: string;
  description?: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
}

// Zod schemas for runtime validation (if needed)
export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  extendedDescription: z.string().optional(),
  category: z.string(),
  type: z.string(),
  imageUrl: z.string(),
  links: z.object({
    modrinth: z.string().optional(),
    none: z.string().optional(),
    curseforge: z.string().optional(),
    github: z.string().optional(),
    play: z.string().optional(),
    visit: z.string().optional(),
  }),
  tags: z.array(z.string()),
  version: z.string().optional(),
  modCount: z.string().optional(),
  featured: z.string(),
});

export const questSchema = z.object({
  id: z.string(),
  triggers: z.array(
    z.object({
      first: z.string().optional(),
      second: z.string().optional(),
      third: z.string().optional(),
      fourth: z.string().optional(),
      fifth: z.string().optional(),
    })
  ),
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  category: z.string(),
});

export type InsertProject = z.infer<typeof projectSchema>;
export type InsertQuest = z.infer<typeof questSchema>;
export type InsertSkill = z.infer<typeof skillSchema>;