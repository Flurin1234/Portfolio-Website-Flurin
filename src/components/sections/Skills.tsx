"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import TechMarquee from "@/components/sections/TechMarquee";
import { useContent } from "@/components/LangProvider";

export default function Skills() {
  const container = useRef<HTMLElement>(null);
  const { skills, work } = useContent();

  useGSAP(
    () => {
      gsap.from(".skill-card", {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".skill-grid", start: "top 80%", once: true },
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="pb-32 pt-16">
      <div className="px-4 md:px-8">
        <SectionHeading title={work.skills} />
        <ul className="skill-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <li
              key={group.category}
              className={`skill-card group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-ink/15 p-6 transition-colors duration-500 hover:border-pop md:p-8 ${
                group.highlight ? "sm:col-span-2" : ""
              }`}
            >
              <span aria-hidden className="absolute inset-0 translate-y-full bg-pop transition-transform duration-700 ease-expo group-hover:translate-y-0" />
              <div className="relative flex h-full flex-col transition-colors duration-500 group-hover:text-[#0d0d12]">
                <p className="text-sm opacity-50">
                  {String(i + 1).padStart(2, "0")}
                  {group.highlight && ` · ${work.highlight}`}
                </p>
                <h3 className="mt-3 font-display text-4xl md:text-5xl">{group.category}</h3>
                {group.highlight && <p className="mt-4 max-w-md opacity-70">{group.highlight}</p>}
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-current/20 px-3 py-1 text-sm transition-colors duration-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <TechMarquee />
    </section>
  );
}
