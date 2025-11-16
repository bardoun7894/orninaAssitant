"use client";

import { motion } from "framer-motion";

interface SoundWaveProps {
  className?: string;
}

const BAR_COUNT = 50;
const BAR_WIDTH = 8;
const BAR_GAP = 16;
const TOTAL_WIDTH = 1200;
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 80;
const ANIMATION_DURATION = 1.8;
const STAGGER_DELAY = 0.05;

export function SoundWave({ className }: SoundWaveProps) {
  const bars = Array.from({ length: BAR_COUNT }, (_, index) => index);

  return (
    <svg
      viewBox="0 0 1200 100"
      className={`w-full h-[60px] md:h-[80px] lg:h-[100px] ${className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated sound wave visualization"
      style={{ willChange: "transform" }}
    >
      {bars.map((index) => {
        const x = (index * (TOTAL_WIDTH / BAR_COUNT)) + (BAR_GAP / 2);
        const yBase = 50;
        
        return (
          <motion.rect
            key={index}
            x={x}
            y={yBase - MIN_HEIGHT / 2}
            width={BAR_WIDTH}
            fill="#60a5fa"
            rx={2}
            style={{ willChange: "transform" }}
            animate={{
              height: [MIN_HEIGHT, MAX_HEIGHT, MIN_HEIGHT],
              y: [yBase - MIN_HEIGHT / 2, yBase - MAX_HEIGHT / 2, yBase - MIN_HEIGHT / 2],
            }}
            transition={{
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * STAGGER_DELAY,
            }}
          />
        );
      })}
    </svg>
  );
}
