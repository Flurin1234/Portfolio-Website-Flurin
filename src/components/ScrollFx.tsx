"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";

// Drives the global --skew variable from scroll velocity, plus a thin scroll progress bar.
export default function ScrollFx() {
  const target = useRef(0);
  const bar = useRef<HTMLDivElement>(null);

  useLenis(({ velocity, progress }) => {
    target.current = gsap.utils.clamp(-7, 7, velocity * 0.3);
    if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
  });

  useEffect(() => {
    const root = document.documentElement;
    let current = 0;
    const tick = () => {
      current += (target.current - current) * 0.12;
      target.current *= 0.9;
      root.style.setProperty("--skew", `${current.toFixed(3)}deg`);
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-pop" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
