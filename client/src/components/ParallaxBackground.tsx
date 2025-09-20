import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";

export default function ParallaxBackground() {
  const scrollY = useParallax();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 brick-bg"
        style={{
          transform: `translateY(${scrollY * -0.15}px)`,
        }}
      />

    <motion.div
      className="absolute top-0 h-full w-[24px] chain-bg"
      style={{
        left: "10%",
        transform: `translateY(${scrollY * -0.4}px)`,
      }}
    />

    <motion.div
      className="absolute top-0 h-full w-[24px] chain-bg"
      style={{
        right: "10%",
        transform: `translateY(${scrollY * -0.4}px)`,
      }}
    />
  </div>
  );
}
