import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ThemeSection() {
  const root = document.documentElement;

  const getInitialHue = () => {
    const hue = getComputedStyle(root).getPropertyValue("--primary-hue");
    return hue ? parseInt(hue) : 210; // fallback if undefined
  };

  const getInitialDark = () => root.classList.contains("light");

  const [isDark, setIsDark] = useState(getInitialDark());
  const [hue, setHue] = useState(getInitialHue());

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-hue", hue.toString());
  }, [hue]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col p-4 space-y-4 rounded-lg shadow-md w-96 pixel-frame-9slice-dark drop-shadow-[0_0_100px_hsl(var(--primary-hue)_91%_53%/0.3)]">
        <h1 className="voxel-text font-bold">
        Theme Customization
        </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsDark(!isDark)}
                className={`pixel-button-9slice mb-8 ${
                  isDark
                    ? "hover:drop-shadow-[0_0_10px_hsl(0_0%_0%/0.6)]"
                    : "hover:drop-shadow-[0_0_8px_hsl(0_0%_100%/0.6)]"
                }`}
                >
                  {isDark ? "Switch to Dark Mode" : "Switch to Light Mode"}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Brace Yourself</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        {/* Hue slider */}
        <div>
          <label htmlFor="hueSlider" className="voxel-text-sm font-bold block mb-2">
            Primary Hue: {hue}°
          </label>
          <input
            id="hueSlider"
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(parseInt(e.target.value))}
            className="w-full drop-shadow-[0_0_4px_hsl(var(--primary-hue)_91%_53%/0.6)]"
            style={{ accentColor: `hsl(${hue}, 99%, 75%)` }}
          />
        </div>
      </div>
    </div>
  );
}
