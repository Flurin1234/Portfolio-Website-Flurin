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

// Full-width cards that stick and pile up while scrolling; the card underneath shrinks back slightly.
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
              className={`hs-card flex min-h-[62svh] origin-top flex-col justify-between gap-12 rounded-3xl p-6 md:p-12 ${theme.card}`}
            >
              <div>
                <p className="hs-fade text-sm opacity-60">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="hs-fade mt-3 font-display text-[clamp(3rem,8vw,7rem)]">{hobby.title}</h3>
              </div>

              <div className="max-w-xl">
                <dl className="hs-fade flex flex-wrap gap-x-10 gap-y-4">
                  {hobby.facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col-reverse">
                      <dt className="mt-1 text-sm opacity-60">{fact.label}</dt>
                      <dd className={`font-display text-[clamp(1.5rem,2.6vw,2.5rem)] ${theme.accent}`}>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="hs-fade mt-6 max-w-md text-sm opacity-75">{hobby.description}</p>
              </div>
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
