"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import Photo from "@/components/Photo";
import { marquee } from "@/content/site";

const rows = [
  ["aspect-[4/3] w-[36vw] md:w-[18vw]", "aspect-[3/4] w-[24vw] md:w-[11vw]", "aspect-square w-[28vw] md:w-[14vw]"],
  ["aspect-[3/4] w-[24vw] md:w-[11vw]", "aspect-square w-[28vw] md:w-[14vw]", "aspect-[4/3] w-[36vw] md:w-[18vw]"],
];

// Two rows of photos that always drift in opposite directions; scrolling speeds them up and flips both.
export default function PhotoMarquee() {
  const container = useRef<HTMLElement>(null);
  const speed = useRef(1);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>(".pm-track");
      const setters = tracks.map((t) => gsap.quickSetter(t, "xPercent"));
      // Each track holds two copies, so wrapping within -50..0 loops seamlessly
      const wrap = gsap.utils.wrap(-50, 0);
      let offset = 0;
      let current = 1;
      const tick = (_: number, delta: number) => {
        // Boost from scrolling fades back to the base speed
        speed.current += ((Math.sign(speed.current) || 1) - speed.current) * 0.04;
        current += (speed.current - current) * 0.08;
        offset += current * delta * 0.001;
        setters.forEach((set, i) => set(wrap(i % 2 ? -50 + offset : -offset)));
      };
      gsap.ticker.add(tick);

      gsap.from(".pm-row", {
        yPercent: 40,
        autoAlpha: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: { trigger: container.current, start: "top 85%", once: true },
      });
      return () => gsap.ticker.remove(tick);
    },
    { scope: container },
  );

  const direction = useRef(1);
  useLenis(({ velocity, direction: dir }) => {
    if (dir) direction.current = dir;
    speed.current = direction.current * (1 + Math.min(Math.abs(velocity) * 0.4, 10));
  });

  return (
    <section ref={container} className="flex flex-col gap-4 overflow-hidden py-24">
      {rows.map((row, r) => (
        <div key={r} className="pm-row">
          <div className="pm-track flex w-max items-center gap-4">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-4">
                {Array.from({ length: 6 }, (_, i) => {
                  const index = r * 6 + i;
                  const photo = marquee[index % marquee.length];
                  return (
                    <Photo
                      key={i}
                      src={photo.src}
                      alt={copy === 1 ? "" : photo.alt}
                      tint={index}
                      skew
                      sizes="18vw"
                      className={`shrink-0 ${row[i % row.length]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
