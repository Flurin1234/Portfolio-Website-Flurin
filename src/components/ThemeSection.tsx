"use client";

import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LIGHT = { "--paper": "#ecebe7", "--ink": "#0d0d12" };
const DARK = { "--paper": "#0d0d12", "--ink": "#ecebe7" };

// Turns the whole page dark while the element fills the middle of the screen.
export function useDarkTheme(ref: RefObject<HTMLElement | null>, start = "top 55%") {
  useGSAP(
    () => {
      const root = document.documentElement;
      ScrollTrigger.create({
        trigger: ref.current,
        start,
        end: "bottom 45%",
        onToggle: ({ isActive }) =>
          gsap.to(root, { ...(isActive ? DARK : LIGHT), duration: 0.8, ease: "power2.inOut", overwrite: true }),
      });
      return () => gsap.set(root, LIGHT);
    },
    { scope: ref },
  );
}

export default function ThemeSection({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useDarkTheme(ref);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
