"use client";
import { motion } from "framer-motion";

// Fades and lifts content in once as it scrolls into view. Reduced motion is handled by MotionConfig.
// Use as="li" directly inside a list so the markup stays valid.
export default function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </Tag>
  );
}
