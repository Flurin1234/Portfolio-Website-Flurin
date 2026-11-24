"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Hobby } from "@/content/site";

// Fixed colours from the site palette so the cards keep their look while the page theme swaps
const themes = [
  { card: "bg-[#efc2a6] text-[#2b140c]", accent: "text-[#a83a14]" },
  { card: "bg-[#a83a14] text-[#ecebe7]", accent: "text-[#ffc9b3]" },
  { card: "bg-[#2b140c] text-[#ecebe7]", accent: "text-pop" },
  { card: "bg-[#0d0d12] text-[#ecebe7]", accent: "text-[#efc2a6]" },
];

// Full-width cards that stick and pile up while scrolling: title and short text left, key facts right.
export default function HobbyStack({ items }: { items: Hobby[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".hs-card");
      cards.forEach((card, i) => {
        gsap.from(card.querySelectorAll(".hs-fade"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: "top 70%", once: true },
        });
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.92,
          filter: "brightness(0.8)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="px-4 pb-24 md:px-8">
      {/* Sticky constraints count a card's own margin, so the scroll room comes from separate spacer items */}
      <ul>
        {items.map((hobby, i) => {
          const theme = themes[i % themes.length];
          return (
            <Fragment key={hobby.title}>
              <li className="sticky" style={{ top: `calc(12vh + ${i * 1.25}rem)` }}>
                <article
                  className={`hs-card grid min-h-[62svh] origin-top gap-10 rounded-3xl p-6 md:grid-cols-2 md:p-12 ${theme.card}`}
                >
                  <div className="flex flex-col justify-between gap-8">
                    <h3 className="hs-fade font-display text-[clamp(3rem,8vw,7rem)]">{hobby.title}</h3>
                    <p className="hs-fade max-w-sm opacity-80">{hobby.description}</p>
                  </div>
                  <dl className="hs-fade flex flex-col justify-end gap-8 md:items-end md:text-right">
                    {hobby.facts.map((fact) => (
                      <div key={fact.label} className="flex flex-col-reverse">
                        <dt className="mt-1 text-sm opacity-60">{fact.label}</dt>
                        <dd className={`font-display text-[clamp(2.5rem,6vw,5.5rem)] ${theme.accent}`}>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </li>
              <li aria-hidden className="h-[70vh]" />
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
}
