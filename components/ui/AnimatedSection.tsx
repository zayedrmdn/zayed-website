"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: AnimatedSectionProps) {
  const directions = {
    up: { opacity: 0, y: 20 },
    down: { opacity: 0, y: -20 },
    left: { opacity: 0, x: -20 },
    right: { opacity: 0, x: 20 },
  };

  return (
    <motion.div
      initial={directions[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}