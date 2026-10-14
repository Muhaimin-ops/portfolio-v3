"use client";
import { useEffect, useRef } from "react";

// Drifting agent nodes that link up when close and shy away from the pointer.
export default function Mesh() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, mx = -999, my = -999;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const nodes = Array.from({ length: 36 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0004, vy: (Math.random() - .5) * .0004 }));
    const size = () => { w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#c2410c";
    const draw = () => {
      ctx.clearRect(0, 0, w, h); const col = color(); ctx.fillStyle = col; ctx.strokeStyle = col;
      const p = nodes.map((n) => {
        if (!still) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > 1) n.vx *= -1; if (n.y < 0 || n.y > 1) n.vy *= -1; }
        let x = n.x * w, y = n.y * h; const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy);
        if (d < 120) { x += (dx / d) * (120 - d) * .35; y += (dy / d) * (120 - d) * .35; }
        return { x, y };
      });
      for (let i = 0; i < p.length; i++) {
        ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(p[i].x, p[i].y, 2.2, 0, 7); ctx.fill();
        for (let j = i + 1; j < p.length; j++) {
          const d = Math.hypot(p[i].x - p[j].x, p[i].y - p[j].y);
          if (d < 150) { ctx.globalAlpha = (1 - d / 150) * .45; ctx.beginPath(); ctx.moveTo(p[i].x, p[i].y); ctx.lineTo(p[j].x, p[j].y); ctx.stroke(); }
        }
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    size(); draw(); addEventListener("resize", size); addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
