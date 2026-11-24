"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Glow from "@/components/Glow";
import { site } from "@/content/site";

const IntroContext = createContext(false);

export const useIntroDone = () => useContext(IntroContext);

// The name rises in letter by letter and fills up in a soft wave while the percentage counts, then the panels lift away.
function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const count = root.current!.querySelector<HTMLElement>(".pl-count")!;
      const counter = { value: 0 };
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.3 : 2.4;
      const letters = site.firstName.length;

      gsap
        .timeline({ onComplete: onDone })
        .from(".pl-char", { yPercent: 105, duration: 1, ease: "expo.out", stagger: 0.05 })
        .to(
          counter,
          {
            value: 100,
            duration,
            ease: "power2.inOut",
            onUpdate: () => {
              count.textContent = String(Math.round(counter.value));
            },
          },
          0.3,
        )
        .to(".pl-bar", { scaleX: 1, duration, ease: "power2.inOut" }, 0.3)
        .to(
          ".pl-fill",
          { clipPath: "inset(0% 0% 0% 0%)", duration: duration * 0.7, ease: "power2.inOut", stagger: (duration * 0.3) / Math.max(1, letters - 1) },
          0.3,
        )
        .to(".pl-char", { yPercent: -105, duration: 0.7, ease: "expo.in", stagger: 0.03 })
        .to(".pl-meta", { autoAlpha: 0, duration: 0.4 }, "<")
        .call(onReveal)
        // Dark panel lifts first, the orange one follows a beat later
        .to(".pl-dark", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "<0.3")
        .to(".pl-pop", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "<0.15");
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
    <div ref={root} aria-hidden className="fixed inset-0 z-[90]">
      <div className="pl-pop absolute inset-0 bg-pop" style={{ clipPath: "inset(0% 0% 0% 0%)" }} />
      <div
        className="pl-dark absolute inset-0 isolate flex items-center justify-center overflow-hidden bg-ink text-paper"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <Glow color="pop" strength={0.22} className="-bottom-[40vh] -left-[20vw] size-[90vw]" />

        <p className="flex overflow-hidden font-display text-[26vw] leading-[0.8] md:text-[20vw]">
          {site.firstName.split("").map((char, i) => (
            <span key={i} className="pl-char relative inline-block">
              <span className="block text-transparent [-webkit-text-stroke:1px_rgba(236,235,231,0.25)]">{char}</span>
              <span className="pl-fill absolute inset-0 text-pop" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
                {char}
              </span>
            </span>
          ))}
        </p>

        <div className="pl-meta absolute inset-x-4 bottom-6 md:inset-x-8 md:bottom-8">
          <p className="text-right font-mono text-sm tabular-nums text-paper/60">
            <span className="pl-count">0</span>%
          </p>
          <div className="mt-3 h-px bg-paper/15">
            <div className="pl-bar h-full origin-left scale-x-0 bg-pop" />
          </div>
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
