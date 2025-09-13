import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";

export default function ParallaxBackground() {
  const scrollY = useParallax();

  return (
    <motion.div
      className="fixed inset-0 z-0 brick-bg"
      style={{
        transform: `translateY(${scrollY * -0.15}px)`,
      }}
    />
  );
}
