"use client";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, { stiffness: 180, damping: 22, mass: 0.4 });
  const rotateY = useSpring(targetY, { stiffness: 180, damping: 22, mass: 0.4 });
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (reduceMotion || e.pointerType !== "mouse") return;
    targetX.set(-((e.clientY - r.top) / r.height - 0.5) * 3);
    targetY.set(((e.clientX - r.left) / r.width - 0.5) * 4);
  };
  const reset = () => {
    targetX.set(0);
    targetY.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`spotlight relative overflow-hidden rounded-2xl border border-line ${className}`}
    >
      {children}
    </motion.div>
  );
}
