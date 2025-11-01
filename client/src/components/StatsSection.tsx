import { useState, useEffect } from "react";
import QuestCard from "./QuestCard";
import type { Quest } from "@shared/schema";
import { motion } from "framer-motion";
import LoadingComponent from "@/components/LoadingComponent";
import CardsLoadingComponent from "@/components/CardsLoadingComponent";

interface StatsSectionProps {
  setActiveTab: (tabId: string) => void;
}

export default function StatsSection({ setActiveTab }: StatsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section id="stats" className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto mt-8 mb-8 text-center">
          <motion.h2
                    className="voxel-text font-bold text-2xl md:text-4xl font-bold text-primary mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
            Material Stats
          </motion.h2>
          <motion.p className="text-muted-foreground max-w-2xl mx-auto font-bold"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8 }}>
                      Find information about parts of the Cognata modpack.
                      <p className="font-light mt-4">
                      Entries are sorted mostly in the order in which you would encounter them going through progression normally.
                      </p>
                      <p className="font-light mt-4">
                      Clicking on one of the related items of an entry will search for that item.
                      </p>
                      <p className="mt-4">
                      THIS GUIDE IS INCOMPLETE!
                      </p>
                      <p className="font-light mt-4">
                      However, it should provide enough information for you to get at least to the Nether.
                      </p>
                    </motion.p>
          <table className="min-w-full mt-8 border border-gray-600 rounded-lg text-sm text-center">
            <thead className="text-primary font-bold hover:text-secondary-foreground">
              <tr>
                <th className="px-3 py-2 bg-secondary border border-gray-600">Name</th>
                <th className="px-3 py-2 bg-secondary border border-gray-600">Damage Bonus</th>
                <th className="px-3 py-2 bg-secondary border border-gray-600">Speed Bonus</th>
                <th className="px-3 py-2 bg-secondary border border-gray-600">Durability</th>
                <th className="px-3 py-2 bg-secondary border border-gray-600">Enchantability</th>
                <th className="px-3 py-2 bg-secondary border border-gray-600">Mining Speed</th>
                <th className="px-3 py-2 bg-secondary border border-gray-600">Mining Level</th>
              </tr>
            </thead>
            <tbody className="text-secondary-foreground bg-card">
              {[
                ["Skysteel", 4.4, 0, 3400, 20, 9.0, 4],
                ["Netherite", 4, 0, 2031, 15, 9.0, 4],
                ["Mysticrain", 3.5, 0, 1800, 20, 8.5, 3],
                ["Aetherium", 4, 0.2, 1758, 14, 8.5, 3],
                ["Shadowsteel", 4.2, 0, 1682, 18, 9.0, 3],
                ["Diamond", 3, 0, 1561, 10, 8.0, 3],
                ["Titanium Quartz", 2.2, 0.2, 1500, 17, 7.0, 3],
                ["Steel", 2.8, 0, 1425, 16, 7.0, 2],
                ["Titanium", 2, 0.2, 1255, 14, 7.0, 2],
                ["Crimsonite", 2.2, 0, 879, 12, 6.5, 2],
                ["Sliver", 2, 0.4, 852, 14, 7.5, 2],
                ["Shadowite", 2.5, 0, 768, 12, 6.0, 2],
                ["Sapphire", 3, 0.2, 775, 14, 7.5, 2],
                ["Topaz", 2, 0, 675, 15, 7.0, 2],
                ["Ruby", 1.5, 0.2, 520, 14, 6.0, 2],
                ["Citrine", 2, 0.2, 450, 16, 6.0, 2],
                ["Jade", 3.5, 0.2, 400, 12, 7.0, 2],
                ["Iron", 2, 0, 250, 14, 6.0, 2],
                ["Stone", 1, 0, 131, 5, 4.0, 1],
                ["White Crystal", 1.5, 0, 125, 14, 6.0, 2],
                ["Wooden", 0, 0, 59, 15, 2.0, 0],
                ["Golden", 0, 0.5, 32, 22, 12.0, 0],
              ].map((row) => (
                <tr key={row[0]} className="transition-colors hover:text-primary hover:bg-secondary">
                  {row.map((cell, i) => (
                    <td key={i} className="px-3 py-2 border border-gray-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </section>
  );
}
