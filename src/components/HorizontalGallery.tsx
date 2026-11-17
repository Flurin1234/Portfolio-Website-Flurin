"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Media, { toneCycle } from "@/components/Media";
import type { Hobby } from "@/content/site";

// Pinned section that scrolls the hobby cards horizontally on desktop.
export default function HorizontalGallery({ items }: { items: Hobby[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".hobby-card").forEach((card) => {
          gsap.fromTo(
            card.querySelector(".media-inner"),
            { xPercent: -10, scale: 1.2 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.from(card, {
            rotate: 4,
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "left 40%", scrub: true },
          });
        });

        gsap.to(".hg-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative overflow-hidden md:h-svh">
      <div
        ref={track}
        className="flex flex-col gap-16 px-4 pb-32 md:h-full md:w-max md:flex-row md:items-center md:gap-6 md:px-8 md:pb-0"
      >
        {items.map((hobby, i) => (
          <article key={hobby.title} className="hobby-card group/media shrink-0 md:w-[28vw]">
            <div className="relative">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-paper/80 px-3 py-1 text-sm backdrop-blur">
                {hobby.caption}
              </span>
              <Media
                src={hobby.image}
                alt={hobby.title}
                tone={toneCycle[i % toneCycle.length]}
                sizes="(min-width: 768px) 32vw, 100vw"
                className="aspect-[4/5] md:aspect-auto md:h-[50svh]"
              />
            </div>
            <h2 className="mt-5 text-xl font-medium tracking-tight md:text-2xl">{hobby.title}</h2>
            <p className="mt-2 max-w-sm text-ink/70">{hobby.description}</p>
          </article>
        ))}
        <div className="hidden w-[24vw] shrink-0 font-display text-[5vw] leading-[0.85] text-blue md:block">
          Mehr
          <br />
          bald.
        </div>
      </div>
      <div className="absolute inset-x-8 bottom-6 hidden h-px bg-ink/10 md:block">
        <div className="hg-progress h-full origin-left scale-x-0 bg-blue" />
      </div>
    </section>
  );
}
