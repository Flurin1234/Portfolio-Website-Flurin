"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/components/IntroProvider";
import Glow from "@/components/Glow";

export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  const container = useRef<HTMLElement>(null);
  const introDone = useIntroDone();

  useGSAP(
    () => {
      if (!introDone) return;
      const split = SplitText.create(".page-title", { type: "chars", mask: "chars" });
      gsap
        .timeline({ delay: 0.15 })
        .from(split.chars, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.04 })
        .from(".page-fade", { autoAlpha: 0, y: 20, duration: 1, ease: "power3.out" }, 0.4);
    },
    { scope: container, dependencies: [introDone] },
  );

  return (
    <header ref={container} className="relative px-4 pb-10 pt-32 md:px-8 md:pb-16 md:pt-40">
      <Glow color="sky" strength={1} className="-left-[25vw] -top-[30vh] size-[90vw]" />
      <Glow color="rose" strength={1} className="-right-[20vw] top-0 size-[50vw]" />
      <h1
        className="page-title font-display text-[16vw] leading-[0.82] md:text-[9vw]"
        style={{ visibility: introDone ? undefined : "hidden" }}
      >
        {title}
      </h1>
      {intro && <p className="page-fade mt-6 max-w-xl text-lg text-ink/70 md:text-xl">{intro}</p>}
    </header>
  );
}
