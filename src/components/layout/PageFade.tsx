"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PageFade({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
