"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Hobby } from "@/content/site";

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[0.4em] shrink-0 fill-current">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

// Big typographic rows; on hover an orange band slides in from the side the cursor entered and runs the keywords.
export default function HobbyRows({ items }: { items: Hobby[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".hb-overlay", { yPercent: 101 });
      gsap.from(".hb-row", {
        y: 50,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
    },
    { scope: ref },
  );

  const slide = (e: React.PointerEvent<HTMLLIElement>, entering: boolean) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const edge = e.clientY < rect.top + rect.height / 2 ? -101 : 101;
    const overlay = e.currentTarget.querySelector(".hb-overlay");
    if (entering) gsap.fromTo(overlay, { yPercent: edge }, { yPercent: 0, duration: 0.6, ease: "expo.out", overwrite: true });
    else gsap.to(overlay, { yPercent: edge, duration: 0.5, ease: "expo.out", overwrite: true });
  };

  return (
    <section ref={ref} className="px-4 pb-24 md:px-8">
      <ul className="border-b border-ink/15">
        {items.map((hobby, i) => {
          const band = [hobby.title, ...hobby.keywords];
          return (
            <li
              key={hobby.title}
              onPointerEnter={(e) => slide(e, true)}
              onPointerLeave={(e) => slide(e, false)}
              className="hb-row group relative overflow-hidden border-t border-ink/15"
            >
              <div className="grid gap-3 py-8 md:grid-cols-12 md:items-center md:gap-6 md:py-10">
                <span className="text-sm text-ink/45 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[clamp(2.75rem,6.5vw,6rem)] md:col-span-5">{hobby.title}</h3>
                <div className="md:col-span-6">
                  <p className="font-serif text-xl italic text-ink/60 md:text-2xl">{hobby.caption}</p>
                  <p className="mt-2 max-w-lg text-ink/70">{hobby.description}</p>
                </div>
              </div>

              <div aria-hidden className="hb-overlay pointer-events-none absolute inset-0 hidden items-center overflow-hidden bg-pop text-[#0d0d12] md:flex">
                {/* Two copies so the -50% loop is seamless */}
                <div className="hb-marquee flex w-max [animation-play-state:paused] group-hover:[animation-play-state:running]">
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center">
                      {[...band, ...band].map((word, j) => (
                        <span key={j} className="flex items-center gap-[0.4em] pr-[0.4em] font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-none">
                          <span className={`whitespace-nowrap ${j % 2 ? "text-transparent [-webkit-text-stroke:1.5px_currentColor]" : ""}`}>{word}</span>
                          <Star />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
