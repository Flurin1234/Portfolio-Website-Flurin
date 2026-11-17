"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { timeline } from "@/content/site";

// Vertical timeline; the line fills and dots light up as you scroll past each entry.
export default function Timeline() {
  const container = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".tl-entry").forEach((entry) => {
        gsap.from(entry.querySelectorAll(".tl-fade"), {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: entry, start: "top 85%", once: true },
        });
        gsap.fromTo(
          entry.querySelector(".tl-fill"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: entry, start: "top 65%", end: "bottom 65%", scrub: true },
          },
        );
        ScrollTrigger.create({
          trigger: entry,
          start: "top 65%",
          toggleClass: { targets: entry, className: "is-active" },
        });
      });
    },
    { scope: container },
  );

  return (
    <ol ref={container}>
      {timeline.map((item) => (
        <li key={item.team} className="tl-entry group grid gap-3 md:grid-cols-12 md:gap-6">
          <p className="tl-fade pt-1 text-sm text-ink/45 transition-colors duration-500 group-[.is-active]:text-blue md:col-span-3">
            {item.period}
          </p>
          <div className="relative pb-16 pl-8 md:col-span-9">
            <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-ink/10 group-last:hidden">
              <span className="tl-fill absolute inset-0 origin-top bg-blue" />
            </span>
            <span
              aria-hidden
              className="absolute left-0 top-1.5 size-[11px] rounded-full border border-ink/25 bg-paper transition-[background-color,border-color,scale] duration-500 group-[.is-active]:scale-125 group-[.is-active]:border-blue group-[.is-active]:bg-blue"
            />
            <h3 className="tl-fade text-xl font-medium tracking-tight md:text-2xl">{item.team}</h3>
            <p className="tl-fade mt-1 text-blue">{item.role}</p>
            <p className="tl-fade mt-4 max-w-xl text-ink/70">{item.description}</p>
            <ul className="tl-fade mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <li key={tag} className={`rounded-full px-3 py-1 text-sm ${["bg-sky", "bg-rose", "bg-sage"][i % 3]}`}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
