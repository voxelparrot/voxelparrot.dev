import { useEffect, useState } from "react";

export default function useQuestTranslations() {
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/data/quests_translate.json")
      .then((res) => res.json())
      .then((data) => setTranslations(data))
      .catch((err) => console.error("Failed to load quest translations", err));
  }, []);

  return translations;
}
