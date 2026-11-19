"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Photo from "@/components/Photo";
import type { Hobby } from "@/content/site";

// Image strips side by side; on desktop scrolling opens them one after another, on touch a tap opens one.
export default function HobbyPanels({ items }: { items: Hobby[] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.from(".hp-panel", {
        yPercent: 15,
        autoAlpha: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });

      gsap.matchMedia().add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".hp-panel");
        const last = panels.length - 1;
        const state = { pos: 0 };
        // Each panel widens as the scroll position passes over its index
        const apply = () => {
          panels.forEach((el, i) => (el.style.flexGrow = String(1 + 3 * Math.max(0, 1 - Math.abs(state.pos - i)))));
          setActive(Math.round(state.pos));
        };
        apply();
        gsap.to(state, {
          pos: last,
          ease: "none",
          onUpdate: apply,
          scrollTrigger: { trigger: ref.current, start: "top top", end: `+=${last * 70}%`, pin: true, scrub: 0.8 },
        });
        return () => panels.forEach((el) => (el.style.flexGrow = ""));
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="px-4 pb-24 md:flex md:h-svh md:items-center md:px-8 md:pb-0">
      <ul className="flex h-[130svh] w-full flex-col gap-2 md:h-[78svh] md:flex-row md:gap-3">
        {items.map((hobby, i) => {
          const open = active === i;
          return (
            <li
              key={hobby.title}
              className={`hp-panel flex min-h-0 min-w-0 basis-0 max-md:transition-[flex-grow] max-md:duration-700 max-md:ease-expo ${
                open ? "grow-[4]" : "grow"
              }`}
            >
              <button
                type="button"
                aria-pressed={open}
                onClick={() => setActive(i)}
                className="relative size-full overflow-hidden text-left text-[#ecebe7]"
              >
                <Photo
                  src={hobby.image}
                  alt={hobby.title}
                  tint={i}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`absolute! inset-0 transition-[scale] duration-1000 ease-expo ${open ? "scale-100" : "scale-110"}`}
                />
                <span className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                <span
                  className={`absolute bottom-6 left-5 hidden font-display text-3xl transition-opacity duration-500 [writing-mode:vertical-rl] md:block md:rotate-180 ${
                    open ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  {hobby.title}
                </span>

                <span
                  className={`absolute inset-x-5 bottom-5 block transition-[opacity,translate] duration-700 ease-expo md:inset-x-8 md:bottom-8 ${
                    open ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-100 md:opacity-0"
                  }`}
                >
                  <span className="block font-display text-[11vw] md:text-[5.5vw]">{hobby.title}</span>
                  <span className="mt-2 block font-serif text-xl italic opacity-80 md:text-2xl">{hobby.caption}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
