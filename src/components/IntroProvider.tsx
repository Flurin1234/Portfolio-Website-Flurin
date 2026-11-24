"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

const IntroContext = createContext(false);

export const useIntroDone = () => useContext(IntroContext);

// A thin line fills across the middle with name and percentage on it, then the screen splits open along the line.
function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const count = root.current!.querySelector<HTMLElement>(".pl-count")!;
      const counter = { value: 0 };
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.3 : 2.2;

      gsap
        .timeline({ onComplete: onDone })
        .from(".pl-text", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.06 })
        .from(".pl-line", { scaleX: 0, duration: 0.9, ease: "expo.out" }, 0)
        .to(
          counter,
          {
            value: 100,
            duration,
            ease: "power2.inOut",
            onUpdate: () => {
              count.textContent = String(Math.round(counter.value)).padStart(2, "0");
            },
          },
          0.3,
        )
        .to(".pl-fill", { scaleX: 1, duration, ease: "power2.inOut" }, 0.3)
        .to(".pl-text", { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.04 })
        .to(".pl-line", { autoAlpha: 0, duration: 0.3 }, "<0.3")
        .call(onReveal)
        // Dark halves open first and briefly reveal orange ones underneath, which follow a beat later
        .to(".pl-top", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<")
        .to(".pl-bottom", { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
        .to(".pl-pop-top", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<0.14")
        .to(".pl-pop-bottom", { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<");
    },
    { scope: root },
  );

  useGSAP(() => {
    lenis?.stop();
    return () => {
      lenis?.start();
      // Lenis hides the scrollbar while stopped, so pinned sections were measured too wide
      ScrollTrigger.refresh();
    };
  }, [lenis]);

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[90] text-[#ecebe7]">
      <div className="pl-pop-top absolute inset-x-0 top-0 h-1/2 bg-pop" />
      <div className="pl-pop-bottom absolute inset-x-0 bottom-0 h-1/2 bg-pop" />
      <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-[#0d0d12]" />
      <div className="pl-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#0d0d12]" />

      {/* The line sits exactly on the seam between the halves */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-full md:inset-x-8">
        <div className="flex items-end justify-between pb-3 text-sm">
          <span className="overflow-hidden">
            <span className="pl-text block">
              {site.firstName} {site.lastName}
            </span>
          </span>
          <span className="overflow-hidden">
            <span className="pl-text block tabular-nums">
              <span className="pl-count">00</span>
            </span>
          </span>
        </div>
        <div className="pl-line h-px origin-left bg-[#ecebe7]/20">
          <div className="pl-fill h-full origin-left scale-x-0 bg-pop" />
        </div>
      </div>
    </div>
  );
}

export default function IntroProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(true);
  const reveal = useCallback(() => setRevealed(true), []);
  const done = useCallback(() => setMounted(false), []);

  return (
    <IntroContext value={revealed}>
      {mounted && <Preloader onReveal={reveal} onDone={done} />}
      {children}
    </IntroContext>
  );
}
