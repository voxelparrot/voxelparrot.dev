import { motion } from "framer-motion";
import type { Quest } from "@shared/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface QuestCardProps {
  quest: Quest;
  index: number;
  onTriggerClick?: (triggerText: string) => void;
  translations: Record<string, string>;
}

export default function QuestCard({
  quest,
  index,
  onTriggerClick,
  translations,
}: QuestCardProps) {
  return (
    <motion.div
      className="bg-card border border-border rounded-lg overflow-hidden hover-lift flex flex-row items-center pixel-frame-9slice-dark"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`card-quest-${quest.id}`}
    >
      <div className="m-5 flex flex-col flex-1 items-left">
        {/* Title + Icon */}
        <h3
          className="text-xl font-bold mb-2 flex items-center space-x-2 line-clamp-3 min-h-[calc(1.25rem*3)]"
          data-testid={`title-quest-${quest.id}`}
        >
          <img
            src={`/assets/quest/${quest.icon}.png`}
            alt={quest.title}
            className="w-8 h-8 min-w-[30px] shrink-0 object-cover image-pixelated"
            data-testid={`img-quest-${quest.id}`}
          />
          <span>{quest.title}</span>
        </h3>

        {/* Description */}
        <p
          className="text-muted-foreground text-sm mb-4 line-clamp-3 min-h-[calc(1.25rem*3)]"
          data-testid={`description-quest-${quest.id}`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {quest.description}
          </ReactMarkdown>
        </p>

        {/* Triggers */}
        <div className="flex items-center gap-2 mb-4">
          <span
            key={`${quest.id}-related-itself`}
            className="cursor-pointer"
            onClick={() => onTriggerClick?.(quest.title ?? quest.id)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    className="transition-all duration-300 ease-in-out inline-block pixel-text"
                    data-testid="trigger"
                  >
                    <img
                      src={`/assets/quest/${quest.icon}.png`}
                      alt={quest.title}
                      className="w-50 h-50 min-w-[30px] shrink-0 object-cover image-pixelated"
                      data-testid={`img-trigger-${quest.id ?? "related-itself"}`}
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{quest.title ?? quest.id}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          {quest.triggers?.map((t, idx) =>
            Object.values(t).map((triggerText) => (
              <span
                key={`${idx}-${triggerText}`}
                className="cursor-pointer"
                onClick={() =>
                  onTriggerClick?.(translations[triggerText] ?? triggerText)
                }
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        className="transition-all duration-300 ease-in-out inline-block pixel-text"
                        data-testid="trigger"
                      >
                        <img
                          src={`/assets/quest/${triggerText}.png`}
                          alt={triggerText}
                          className="w-50 h-50 min-w-[30px] shrink-0 object-cover image-pixelated"
                          data-testid={`img-trigger-${triggerText}`}
                        />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{translations[triggerText] ?? triggerText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            )),
          )}
        </div>

        {/* View Details Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="mt-auto w-full pixel-button-9slice text-accent py-2 rounded pixel-text"
              data-testid={`button-view-details-${quest.id}`}
            >
              Details
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{quest.title}</DialogTitle>
              <DialogDescription>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {quest.description}
                </ReactMarkdown>
              </DialogDescription>
            </DialogHeader>

            {/* Full quest details */}
            <div className="mt-4 space-y-3">
              <p>
                <h3>Related:</h3>
              </p>
              <ul className="list-disc list-inside text-sm">
                {quest.triggers?.map((t, idx) =>
                  Object.values(t).map((triggerText) => (
                    <li
                      key={`${idx}-${triggerText}`}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={`/assets/quest/${triggerText}.png`}
                        alt={triggerText}
                        className="w-5 h-5 shrink-0 object-cover image-pixelated"
                        data-testid={`img-trigger-${triggerText}`}
                      />
                      <span>{translations[triggerText] ?? triggerText}</span>
                    </li>
                  )),
                )}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
