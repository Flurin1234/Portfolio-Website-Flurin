"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/content/site";

export default function Skills() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-row", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: container.current, start: "top 75%", once: true },
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="px-4 pb-32 pt-16 md:px-8">
      <SectionHeading title="Womit ich arbeite" />
      <ul>
        {skills.map((group) => (
          <li
            key={group.category}
            className="skill-row grid gap-2 border-t border-ink/10 py-6 last:border-b md:grid-cols-12 md:gap-6 md:py-8"
          >
            <h3 className="text-2xl font-medium tracking-tight md:col-span-4">{group.category}</h3>
            <p className="text-2xl tracking-tight text-ink/50 md:col-span-8">{group.items.join(", ")}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
