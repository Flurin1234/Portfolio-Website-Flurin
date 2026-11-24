"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Hobby } from "@/content/site";

// Light rows in the same line-and-type style as the timeline.
export default function HobbyList({ items }: { items: Hobby[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".hl-row").forEach((row, i) => {
        // Alternate sides; the part nearest the entry edge travels furthest, so the pieces spread out instead of crossing
        const dir = i % 2 ? 1 : -1;
        const [title, text, facts] = dir > 0 ? [0.15, 0.3, 0.45] : [0.45, 0.3, 0.15];
        const w = () => window.innerWidth;
        gsap
          .timeline({
            scrollTrigger: { trigger: row, start: "top 100%", end: "top 45%", scrub: 1, invalidateOnRefresh: true },
            defaults: { ease: "power3.out" },
          })
          .fromTo(row.querySelector(".hl-line"), { scaleX: 0, transformOrigin: dir < 0 ? "left" : "right" }, { scaleX: 1, ease: "none" }, 0)
          .fromTo(
            row.querySelector(".hl-title"),
            { x: () => dir * w() * title, skewX: dir * -12, autoAlpha: 0, filter: "blur(8px)" },
            { x: 0, skewX: 0, autoAlpha: 1, filter: "blur(0px)" },
            0,
          )
          .fromTo(row.querySelector(".hl-text"), { x: () => dir * w() * text, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, 0.05)
          .fromTo(
            row.querySelectorAll(".hl-fact"),
            { x: () => dir * w() * facts, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, stagger: 0.05 },
            0.1,
          );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="overflow-hidden px-4 pb-20 md:px-8">
      <ul>
        {items.map((hobby) => (
          <li key={hobby.title} className="hl-row group relative last:border-b last:border-ink/15">
            {/* Faint orange wash behind the row on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-pop/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
            <span aria-hidden className="hl-line absolute inset-x-0 top-0 h-px bg-ink/15" />
            <div className="relative grid gap-3 py-6 md:grid-cols-12 md:items-start md:gap-6">
              <h3 className="hl-title text-2xl font-medium tracking-tight transition-colors duration-500 group-hover:text-pop md:col-span-3 md:text-3xl">
                {hobby.title}
              </h3>
              <p className="hl-text max-w-lg text-sm text-ink/60 md:col-span-6 md:pt-1.5 md:text-base">{hobby.description}</p>
              <ul className="space-y-1.5 text-sm md:col-span-3 md:justify-self-end md:pt-2">
                {hobby.facts.map((fact) => (
                  <li key={fact.label} className="hl-fact flex items-center gap-2.5">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-pop" />
                    <span>
                      <span className="font-medium text-ink">{fact.value}</span> <span className="text-ink/50">{fact.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
