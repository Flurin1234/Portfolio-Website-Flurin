"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Glow from "@/components/Glow";

const IntroContext = createContext(false);

export const useIntroDone = () => useContext(IntroContext);

// Lando-style loader: a big percentage counts up, then the panel lifts away.
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
        .from(".pl-line", { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.08 })
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
          0,
        )
        .to(".pl-bar", { scaleX: 1, duration, ease: "power2.inOut" }, 0)
        .to([".pl-count-wrap", ".pl-line"], { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.04 })
        .call(onReveal)
        // Dark panel lifts first, the orange one follows a beat later
        .to(".pl-dark", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "<")
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
        className="pl-dark absolute inset-0 isolate flex flex-col justify-between overflow-hidden bg-ink p-4 text-paper md:p-8"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <Glow color="pop" strength={0.22} className="-bottom-[40vh] -left-[20vw] size-[90vw]" />
        <div className="text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
          <div className="overflow-hidden">
            <p className="pl-line">Schön, dass du</p>
          </div>
          <div className="overflow-hidden">
            <p className="pl-line font-serif italic text-pop">vorbeischaust.</p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <p className="pl-count-wrap flex items-start font-display text-[18vw] leading-[0.8] md:text-[10vw]">
              <span className="pl-count">0</span>
              <span className="mt-[0.08em] text-[0.35em] text-pop">%</span>
            </p>
          </div>
          <div className="mt-6 h-px bg-paper/15">
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
