"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Media, { toneCycle } from "@/components/Media";
import { photos } from "@/content/site";

const IntroContext = createContext(false);

export const useIntroDone = () => useContext(IntroContext);

// Photos pop onto a stack; the last (blue) card grows to fullscreen and fades into the page.
function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>(".pl-tile");
      const last = tiles[tiles.length - 1];
      const step = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.05 : 0.2;

      const tl = gsap.timeline({ onComplete: onDone, delay: 0.2 });
      tiles.forEach((tile, i) => {
        tl.fromTo(
          tile,
          { autoAlpha: 0, scale: 0.7, xPercent: -50, yPercent: -50, y: 120, rotate: gsap.utils.random(-14, 14) },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "expo.out" },
          i * step,
        );
      });
      tl.to(last, { rotate: 0, width: "100vw", height: "100svh", borderRadius: 0, duration: 1.1, ease: "expo.inOut" }, "+=0.15")
        .call(onReveal, [], "-=0.35")
        .to(root.current, { autoAlpha: 0, duration: 0.5 });
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

  const tileClass =
    "pl-tile invisible absolute left-1/2 top-1/2 aspect-[4/5] w-[42vw] overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgb(13_50_77/0.35)] md:w-[17vw]";

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[90] overflow-hidden bg-paper">
      {photos.slice(0, 5).map((photo, i) => (
        <div key={photo.alt} className={tileClass}>
          <Media src={photo.src} alt="" tone={toneCycle[i % toneCycle.length]} sizes="20vw" className="size-full rounded-none" />
        </div>
      ))}
      <div className={`${tileClass} bg-blue`} />
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
