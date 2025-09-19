import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  extendedDescription: text("extended_description"),
  category: text("category").notNull(),
  type: text("type").notNull(), // "mod", "modpack"
  imageUrl: text("image_url").notNull(),
  links: jsonb("links")
    .$type<{
      modrinth?: string;
      none?: string;
      curseforge?: string;
      github?: string;
      play?: string;
      visit?: string;
    }>()
    .notNull()
    .default({}),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  version: text("version"),
  modCount: text("mod_count"),
  featured: text("featured").notNull().default("false"),
});

export const quests = pgTable("quests", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  triggers: jsonb("triggers")
    .$type<
      Array<{
        first?: string;
        second?: string;
        third?: string;
        fourth?: string;
        fifth?: string;
      }>
    >()
    .notNull()
    .default([]),
  title: text("title"),
  description: text("description"),
  icon: text("icon").notNull(),
});

export const skills = pgTable("skills", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  extendedDescription: true,
  type: true,
  imageUrl: true,
  links: true,
  tags: true,
  version: true,
  modCount: true,
  featured: true,
});

export const insertQuestSchema = createInsertSchema(quests).pick({
  title: true,
  description: true,
  triggers: true,
  icon: true,
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
  icon: true,
  category: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertQuest = z.infer<typeof insertQuestSchema>;
export type Quest = typeof quests.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;
