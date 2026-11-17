"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Media, { toneCycle } from "@/components/Media";
import { photos, site } from "@/content/site";

// Desktop layout: [left %, top %, width vw, parallax speed]
const layout = [
  [3, 4, 17, -0.35],
  [40, 0, 12, 0.25],
  [76, 6, 19, -0.2],
  [7, 62, 14, 0.3],
  [62, 68, 16, -0.3],
  [86, 46, 11, 0.45],
  [30, 82, 12, -0.15],
] as const;

export default function Collage() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const text = container.current!.querySelector(".collage-text")!;
      SplitText.create(text, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            opacity: 0.15,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: text, start: "top 80%", end: "bottom 50%", scrub: true },
          }),
      });

      gsap.utils.toArray<HTMLElement>(".collage-item").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { y: speed * -250 },
          {
            y: speed * 250,
            ease: "none",
            scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: container },
  );

  const statement = site.statement.map((part, i) =>
    part.strong ? (
      <strong key={i} className="font-serif font-normal italic text-blue">
        {part.text}
      </strong>
    ) : (
      part.text
    ),
  );

  return (
    <section ref={container} className="relative px-4 py-24 md:h-[150svh] md:px-8 md:py-0">
      <div className="hidden md:block">
        {layout.map(([left, top, width, speed], i) => (
          <div
            key={i}
            data-speed={speed}
            className="collage-item group/media absolute aspect-[4/5]"
            style={{ left: `${left}%`, top: `${top}%`, width: `${width}vw` }}
          >
            <Media
              src={photos[i]?.src}
              alt={photos[i]?.alt ?? ""}
              tone={toneCycle[i % toneCycle.length]}
              sizes="20vw"
              className="size-full transition-transform duration-700 ease-expo group-hover/media:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="flex h-full items-center justify-center">
        <p className="collage-text relative max-w-3xl text-center text-[clamp(1.5rem,2.8vw,2.6rem)] font-medium leading-[1.15] tracking-tight">
          {statement}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 md:hidden">
        {photos.slice(0, 4).map((photo, i) => (
          <Media key={photo.alt} src={photo.src} alt={photo.alt} tone={toneCycle[i % toneCycle.length]} sizes="50vw" className="aspect-[4/5]" />
        ))}
      </div>
    </section>
  );
}
