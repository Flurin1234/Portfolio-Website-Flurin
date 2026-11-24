"use client";

import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LIGHT = { "--paper": "#ecebe7", "--ink": "#0d0d12" };
const DARK = { "--paper": "#0d0d12", "--ink": "#ecebe7" };

// Dark sections can overlap (e.g. photo band and footer), so the page stays dark while any of them is active
let activeDark = 0;
const applyTheme = () =>
  gsap.to(document.documentElement, { ...(activeDark > 0 ? DARK : LIGHT), duration: 0.8, ease: "power2.inOut", overwrite: true });

// Turns the whole page dark while the element fills the middle of the screen.
export function useDarkTheme(ref: RefObject<HTMLElement | null>, start = "top 55%") {
  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start,
        end: "bottom 45%",
        onToggle: ({ isActive }) => {
          activeDark += isActive ? 1 : -1;
          applyTheme();
        },
      });
      return () => {
        if (trigger.isActive) activeDark--;
        if (activeDark <= 0) {
          activeDark = 0;
          gsap.set(document.documentElement, LIGHT);
        }
      };
    },
    { scope: ref },
  );
}

export default function ThemeSection({
  id,
  className = "",
  start,
  children,
}: {
  id?: string;
  className?: string;
  start?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useDarkTheme(ref, start);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
