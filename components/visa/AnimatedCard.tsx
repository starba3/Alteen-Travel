"use client";

import { motion } from "framer-motion";
import { cardHoverAnimation, fadeInUp } from "@/lib/animations";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({ children, className, onClick }: AnimatedCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={cardHoverAnimation}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}