"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Glow from "@/components/Glow";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/content/site";

export default function Skills() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-group", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".skill-grid", start: "top 85%", once: true },
      });
    },
    { scope: container },
  );

  return (
    <section id="skills" ref={container} className="relative scroll-mt-24 px-4 py-16 md:px-8">
      <Glow color="sage" strength={1} className="-left-[30vw] top-0 size-[80vw]" />

      <SectionHeading title="Womit ich arbeite" />
      <div className="skill-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <div
            key={group.category}
            className={`skill-group rounded-2xl p-6 transition-transform duration-500 ease-expo hover:-translate-y-1 ${
              ["bg-sky", "bg-rose", "bg-sage", "bg-cream"][i % 4]
            }`}
          >
            <h3 className="mb-6 text-lg font-medium">{group.category}</h3>
            <p className="leading-relaxed text-ink/70">{group.items.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
