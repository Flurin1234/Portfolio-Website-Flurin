"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "@/components/LangProvider";
import RollingText from "@/components/RollingText";
import { sportRepo } from "@/content/site";

// The section pins while scrolling down moves the screenshots sideways until the last one is in view.
export default function SportApp() {
  const ref = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const { sportApp, ui } = useContent();
  const count = sportApp.screens.length;

  useGSAP(
    () => {
      gsap.from(".sa-fade", {
        y: 40,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });

      // How far the track has to move so its right edge meets the padded right edge
      const distance = () => {
        const el = viewport.current!;
        const cs = getComputedStyle(el);
        const inner = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        return Math.max(0, track.current!.scrollWidth - inner);
      };

      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${distance() * 1.2}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setIndex(Math.round(self.progress * (count - 1)));
            gsap.set(bar.current, { scaleX: self.progress });
          },
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      // Slide width that keeps the whole pinned section within one screen height (4:3 screenshots)
      style={{ "--slide-h": "max(14rem, calc((100svh - 24rem) * 1.33))" } as React.CSSProperties}
      className="flex min-h-svh flex-col justify-center overflow-hidden py-12"
    >
      <div className="flex flex-col gap-4 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <h2 className="sa-fade font-display text-[clamp(2.5rem,5vw,4.5rem)]">{sportApp.name}</h2>
        <div className="sa-fade md:max-w-sm md:text-right">
          <p className="text-sm text-ink/60">{sportApp.description}</p>
          <p className="mt-2 text-sm text-ink/40">{sportApp.tags.join(" · ")}</p>
          <a
            href={sportRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/roll mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-ink/25 px-4 text-sm transition-colors hover:border-pop hover:bg-pop hover:text-[#0d0d12]"
          >
            <RollingText text={ui.code} />
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div ref={viewport} className="mt-10 px-4 md:px-8">
        <div ref={track} className="flex w-max gap-4 md:gap-6">
          {sportApp.screens.map((screen, i) => (
            <figure
              key={screen.src}
              className={`w-[min(78vw,var(--slide-h))] shrink-0 origin-bottom transition-[opacity,scale] duration-700 ease-expo sm:w-[min(46vw,var(--slide-h))] lg:w-[min(30vw,var(--slide-h))] ${
                i === index ? "opacity-100" : "scale-95 opacity-45"
              }`}
            >
              <div className="overflow-hidden rounded-xl border border-ink/10 bg-[#0a0a0a] shadow-xl shadow-ink/10">
                <div className="flex items-center gap-1.5 px-3 py-2">
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                </div>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-3 flex gap-3 text-sm">
                <span className="text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                <span>{screen.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6 px-4 md:px-8">
        <div className="relative h-px flex-1 bg-ink/15">
          <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-ink" />
        </div>
        <p className="text-sm tabular-nums text-ink/50">
          <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
