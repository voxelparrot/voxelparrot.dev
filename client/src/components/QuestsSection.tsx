import { useState, useEffect } from "react";
import QuestCard from "./QuestCard";
import type { Quest } from "@shared/schema";

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
      <section id="cognata" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="cognata" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="pixel-text text-xl md:text-2xl font-bold text-primary mb-4">
            Cognata Guide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find information about parts of the Cognata modpack.
          </p>
        </div>

        {/* Search Box */}
        <div className="flex justify-center mb-6 relative">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-72 rounded-lg border border-gray-400 pixel-text bg-secondary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
