"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Draggable, gsap, useGSAP } from "@/lib/gsap";
import { sportApp } from "@/content/site";

const ease = "expo.out";

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`size-5 ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Screenshots in browser frames on a draggable track; buttons and drag both snap to a slide.
export default function SportApp() {
  const ref = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = sportApp.screens.length;

  // Each slide can sit at the left edge, so the last one is reachable too
  const positions = () => Array.from(track.current!.children as HTMLCollectionOf<HTMLElement>, (s) => -s.offsetLeft);
  const minX = () => positions().at(-1)!;
  const nearest = (x: number) => {
    const p = positions();
    return p.reduce((best, pos, i) => (Math.abs(pos - x) < Math.abs(p[best] - x) ? i : best), 0);
  };

  useGSAP(
    () => {
      const scrollTrigger = { trigger: ref.current, start: "top 75%", once: true };
      gsap.from(".sa-fade", { y: 40, autoAlpha: 0, duration: 1.2, ease, stagger: 0.08, scrollTrigger });
      gsap.from(viewport.current, { x: 240, autoAlpha: 0, duration: 1.6, ease, scrollTrigger });

      const [drag] = Draggable.create(track.current, {
        type: "x",
        inertia: true,
        bounds: { minX: minX(), maxX: 0 },
        edgeResistance: 0.85,
        snap: (x) => positions()[nearest(x)],
        onThrowUpdate() {
          setIndex(nearest(this.x));
        },
        onDrag() {
          setIndex(nearest(this.x));
        },
      });

      const onResize = () => {
        drag.applyBounds({ minX: minX(), maxX: 0 });
        gsap.set(track.current, { x: positions()[nearest(drag.x)] });
        drag.update();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: ref },
  );

  const goTo = (i: number) => {
    const next = gsap.utils.clamp(0, count - 1, i);
    setIndex(next);
    gsap.to(track.current, {
      x: positions()[next],
      duration: 1.1,
      ease,
      onUpdate: () => Draggable.get(track.current!)?.update(),
    });
  };

  return (
    <section ref={ref} className="overflow-hidden py-32">
      <div className="grid gap-6 px-4 md:grid-cols-12 md:items-end md:px-8">
        <div className="md:col-span-7">
          <p className="sa-fade font-serif text-xl italic text-ink/60">{sportApp.eyebrow}</p>
          <h2 className="sa-fade mt-3 font-display text-[clamp(3rem,7vw,6rem)]">{sportApp.name}</h2>
        </div>
        <div className="md:col-span-5">
          <p className="sa-fade max-w-md text-ink/70">{sportApp.description}</p>
          <ul className="sa-fade mt-6 flex flex-wrap gap-2">
            {sportApp.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-sm">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={viewport} className="mt-16 px-4 md:px-8">
        <div ref={track} className="relative flex w-max cursor-grab gap-4 active:cursor-grabbing md:gap-6">
          {sportApp.screens.map((screen, i) => (
            <figure
              key={screen.src}
              className={`w-[78vw] shrink-0 origin-bottom transition-[opacity,scale] duration-700 ease-expo sm:w-[46vw] lg:w-[32vw] ${
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
                    draggable={false}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 78vw"
                    className="select-none object-cover object-top"
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

      <div className="mt-10 flex items-center gap-6 px-4 md:px-8">
        <div className="relative h-px flex-1 bg-ink/15">
          <span
            className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-700 ease-expo"
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
        </div>
        <p className="text-sm tabular-nums text-ink/50">
          <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => goTo(index + dir)}
              disabled={dir === -1 ? index === 0 : index === count - 1}
              aria-label={dir === -1 ? "Vorheriger Screenshot" : "Nächster Screenshot"}
              className="flex size-12 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-pop hover:bg-pop hover:text-[#0d0d12] disabled:pointer-events-none disabled:opacity-30"
            >
              <Arrow flip={dir === -1} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
