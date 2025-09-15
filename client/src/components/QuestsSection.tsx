import { useState, useEffect } from "react";
import QuestCard from "./QuestCard";
import type { Quest } from "@shared/schema";
import { motion } from "framer-motion";

export default function QuestsSection() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchQuests() {
      setIsLoading(true);
      try {
        const indexRes = await fetch("/data/quests.json");
        if (!indexRes.ok) throw new Error("Failed to load quest index");
        const questFiles: string[] = await indexRes.json();

        const missingFiles: string[] = [];
        const questData = await Promise.all(
          questFiles.map(async (file) => {
            try {
              const res = await fetch(`/data/quests/${file}.json`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              return await res.json();
            } catch {
              missingFiles.push(file);
              return null; // so Promise.all still resolves
            }
          }),
        );

        if (missingFiles.length > 0) {
          console.error(
            `Failed to load the following quests: ${missingFiles.join(", ")}`,
          );
        }

        setQuests(questData.filter(Boolean).flat() as Quest[]);
      } catch (err) {
        console.error("Failed to load quests:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuests();
  }, []);

  // Build a translation table dynamically from quest titles
  const translations: Record<string, string | null> = {};
  (quests ?? []).forEach((quest) => {
    translations[quest.id] = quest.title;
  });

  const filteredQuests =
    quests.filter(
      (quest) =>
        quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? [];

  if (isLoading) {
    return (
      <section id="cognata" className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="cognata" className="pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
                    className="pixel-text text-2xl md:text-4xl font-bold text-primary mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
            Cognata
          </motion.h2>
          <motion.p className="text-muted-foreground max-w-2xl mx-auto font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
            Find information about parts of the Cognata modpack.
            <p className="font-light">
            Entries are sorted mostly in the order in which you would encounter them going through progression normally.
            </p>
          </motion.p>
        </div>

        {/* Search Box */}
        <div className="flex justify-center mb-6 relative">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-72 rounded-lg border border-gray-400 pixel-text bg-secondary pixel-frame-9slice"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="relative right-8 text-accent-500 hover-scale-big"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuests.map((quest, index) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              index={index}
              translations={translations}
              onTriggerClick={(triggerText) => setSearchQuery(triggerText)}
            />
          ))}
        </div>

        {filteredQuests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nothing found for the selected search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
