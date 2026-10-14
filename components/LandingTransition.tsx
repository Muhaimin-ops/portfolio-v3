"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/data";

export default function LandingTransition() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (pathname !== "/" || reduceMotion) {
      setVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => setVisible(false), 520);
    return () => window.clearTimeout(timeout);
  }, [pathname, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && pathname === "/" && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-bg motion-reduce:hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-[min(22rem,70vw)]">
            <motion.p
              className="font-display text-center text-2xl font-semibold tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {profile.name}<span className="text-accent">.</span>
            </motion.p>
            <motion.span
              aria-hidden="true"
              className="mt-5 block h-px origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.2, 0.7, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
