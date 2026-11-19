"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// Huge section title: letters rise in and the line drifts sideways while scrolling past.
export default function SectionTitle({ title, intro }: { title: string; intro?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".st-title", { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 110,
        rotate: 6,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 35%", scrub: 1 },
      });
      gsap.fromTo(
        ".st-title",
        { xPercent: 6 },
        { xPercent: -6, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      const intro = ref.current!.querySelector(".st-intro");
      if (intro)
        gsap.from(intro, {
          autoAlpha: 0,
          y: 30,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: intro, start: "top 85%", once: true },
        });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
      <h2 className="st-title whitespace-nowrap font-display text-[18vw] leading-[0.82] md:text-[13vw]">{title}</h2>
      {intro && <p className="st-intro mt-8 max-w-xl text-xl text-ink/60 md:text-2xl">{intro}</p>}
    </header>
  );
}
