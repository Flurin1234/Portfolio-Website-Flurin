"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

export default function About({ statement = site.statement }: { statement?: { text: string; strong?: boolean }[] }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const text = container.current!.querySelector(".about-text")!;
      SplitText.create(text, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            opacity: 0.12,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: text, start: "top 80%", end: "bottom 50%", scrub: true },
          }),
      });
      // The orange line draws itself across the section while scrolling
      gsap.fromTo(
        ".about-squiggle",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: container.current, start: "top 75%", end: "bottom 40%", scrub: true },
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative overflow-hidden px-4 py-32 md:px-8 md:py-44">
      <svg
        viewBox="0 0 1400 400"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[60%] w-full -translate-y-1/2"
      >
        <path
          className="about-squiggle"
          d="M-20 260 C 120 60, 260 380, 420 200 S 700 40, 860 220 S 1160 380, 1420 120"
          stroke="var(--color-pop)"
          strokeWidth="14"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
      </svg>
      <p className="about-text relative mx-auto max-w-4xl text-center text-[clamp(1.75rem,3.4vw,3.25rem)] font-medium leading-[1.12] tracking-tight">
        {statement.map((part, i) =>
          part.strong ? (
            <strong key={i} className="font-serif font-normal italic">
              {part.text}
            </strong>
          ) : (
            part.text
          ),
        )}
      </p>
    </section>
  );
}
