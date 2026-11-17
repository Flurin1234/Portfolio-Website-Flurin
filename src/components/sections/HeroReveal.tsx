"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/components/IntroProvider";
import Media from "@/components/Media";
import { site } from "@/content/site";

// One hero layer; rendered twice (base + revealed) with different colours.
function HeroLayer({ revealed = false }: { revealed?: boolean }) {
  const src = revealed ? site.portraitReveal : site.portrait;
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end px-4 pb-12 md:px-8 md:pb-14 ${
        revealed ? "bg-linear-to-br from-blue via-taupe to-olive text-paper" : "bg-cream text-ink"
      }`}
    >
      <div className="absolute bottom-0 left-1/2 h-[72svh] w-[min(72vw,440px)] -translate-x-1/2 overflow-hidden rounded-t-[999px]">
        <Media
          src={src}
          alt={revealed ? "" : `Portrait von ${site.firstName}`}
          tone={revealed ? "rose" : "sky"}
          priority={!revealed}
          sizes="(min-width: 768px) 440px, 72vw"
          className="hero-portrait size-full rounded-none"
        />
      </div>
      <h1 className="hero-title relative max-w-5xl text-[clamp(3rem,8vw,8rem)] font-medium leading-[0.95] tracking-tighter">
        Hi, ich bin <span className="font-serif font-normal italic">{site.firstName}</span>.
      </h1>
    </div>
  );
}

// Lando-style reveal: a soft circle follows the cursor and shows the second colour layer.
export default function HeroReveal() {
  const container = useRef<HTMLElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const introDone = useIntroDone();

  useGSAP(
    () => {
      if (!introDone) return;
      gsap.utils.toArray<HTMLElement>(".hero-title").forEach((title) => {
        const split = SplitText.create(title, { type: "chars", mask: "chars" });
        gsap.from(split.chars, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.03 });
      });
      gsap.from(".hero-portrait", { yPercent: 25, duration: 1.6, ease: "expo.out" });
    },
    { scope: container, dependencies: [introDone] },
  );

  useEffect(() => {
    const section = container.current!;
    const layer = mask.current!;
    const target = { x: 0, y: 0, r: 0 };
    const pos = { x: 0, y: 0, r: 0 };
    const fine = window.matchMedia("(pointer: fine)").matches;
    const radius = () => Math.max(140, window.innerWidth * 0.14);

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.r = radius();
    };
    const onLeave = () => (target.r = 0);

    const tick = (time: number) => {
      if (!fine) {
        const { width, height } = section.getBoundingClientRect();
        target.x = width / 2 + Math.cos(time * 0.6) * width * 0.25;
        target.y = height * 0.55 + Math.sin(time * 0.9) * height * 0.15;
        target.r = radius();
      }
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      pos.r += (target.r - pos.r) * 0.1;
      layer.style.clipPath = `circle(${pos.r}px at ${pos.x}px ${pos.y}px)`;
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    gsap.ticker.add(tick);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <section
      ref={container}
      className="relative z-10 h-svh min-h-[560px] overflow-hidden"
      style={{ visibility: introDone ? undefined : "hidden" }}
    >
      <HeroLayer />
      <div ref={mask} aria-hidden className="absolute inset-0" style={{ clipPath: "circle(0px at 50% 50%)" }}>
        <HeroLayer revealed />
      </div>
    </section>
  );
}
