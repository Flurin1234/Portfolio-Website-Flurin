"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { techStack } from "@/content/site";

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[0.5em] shrink-0 fill-current">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

function Band({ items, className, tilt }: { items: string[]; className: string; tilt: string }) {
  return (
    // Tilt lives on the wrapper so GSAP's scaleX on the band doesn't fight the CSS rotate
    <div className={`absolute left-[-15vw] top-1/2 w-[130vw] -translate-y-1/2 ${tilt}`}>
      <div className={`tm-band overflow-hidden py-3 md:py-5 ${className}`}>
        <div className="tm-track flex w-max">
          {/* Two copies so wrapping at -50% loops seamlessly */}
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {items.map((item, i) => (
                <span
                  key={item}
                  className="flex items-center gap-[0.35em] pr-[0.35em] font-display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-none"
                >
                  <span className={`whitespace-nowrap ${i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_currentColor]" : ""}`}>
                    {item}
                  </span>
                  <Star />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Two crossing bands that drift in opposite directions; scrolling speeds them up and flips the direction.
export default function TechMarquee() {
  const container = useRef<HTMLDivElement>(null);
  const speed = useRef(1);
  const direction = useRef(1);

  useGSAP(
    () => {
      const setters = gsap.utils.toArray<HTMLElement>(".tm-track").map((t) => gsap.quickSetter(t, "xPercent"));
      const wrap = gsap.utils.wrap(-50, 0);
      let offset = 0;
      let current = 1;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tick = (_: number, delta: number) => {
        speed.current += ((Math.sign(speed.current) || 1) - speed.current) * 0.04;
        current += (speed.current - current) * 0.08;
        offset += current * delta * 0.0015;
        setters.forEach((set, i) => set(wrap(i % 2 ? -50 + offset : -offset)));
      };
      if (!reduced) gsap.ticker.add(tick);

      gsap.from(".tm-band", {
        scaleX: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: { trigger: container.current, start: "top 80%", once: true },
      });
      return () => gsap.ticker.remove(tick);
    },
    { scope: container },
  );

  useLenis(({ velocity, direction: dir }) => {
    if (dir) direction.current = dir;
    speed.current = direction.current * (1 + Math.min(Math.abs(velocity) * 0.4, 10));
  });

  return (
    <div ref={container} aria-label={techStack.join(", ")} role="img" className="relative mt-16 h-[30vw] min-h-52 overflow-hidden">
      <Band items={techStack} tilt="z-10 -rotate-[6deg]" className="bg-pop text-[#0d0d12]" />
      <Band items={[...techStack].reverse()} tilt="rotate-[5deg]" className="bg-ink text-paper" />
    </div>
  );
}
