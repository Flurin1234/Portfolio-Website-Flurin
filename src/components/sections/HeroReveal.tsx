"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/components/IntroProvider";
import Backdrop from "@/components/Backdrop";
import { useContent } from "@/components/LangProvider";
import { site } from "@/content/site";

function HeroLayer() {
  const src = site.portrait;
  const { greeting, meta } = useContent();
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-4 pt-16 text-ink md:px-8">
      {src && (
        <div className="absolute bottom-0 left-1/2 h-[70svh] w-[min(70vw,420px)] -translate-x-1/2">
          <Image src={src} alt={`Portrait von ${site.firstName}`} fill priority sizes="420px" className="object-cover object-top" />
        </div>
      )}
      <h1 className="hero-title relative text-[clamp(3.5rem,12.5vw,13rem)] font-medium leading-[1] tracking-tighter">
        {greeting}
        <br />
        <span className="font-serif font-normal italic text-pop">{site.firstName}.</span>
      </h1>
      <ul className="hero-sub relative mt-8 flex flex-wrap gap-2 text-sm">
        {meta.map((item) => (
          <li key={item} className="rounded-full border border-ink/15 px-3 py-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeroReveal() {
  const container = useRef<HTMLElement>(null);
  const introDone = useIntroDone();

  useGSAP(
    () => {
      if (!introDone) return;
      gsap.from(".hero-stage", { scale: 1.15, yPercent: 10, duration: 1.8, ease: "expo.out" });
      gsap.utils.toArray<HTMLElement>(".hero-title").forEach((title) => {
        const split = SplitText.create(title, { type: "lines", mask: "lines" });
        gsap.from(split.lines, { yPercent: 110, rotate: 3, duration: 1.4, ease: "expo.out", stagger: 0.12, delay: 0.15 });
      });
      gsap.from(".hero-badge", { scale: 0, rotate: -180, duration: 1.4, delay: 0.5, ease: "expo.out" });
      gsap.from(".hero-sub", { y: 24, autoAlpha: 0, duration: 1.2, delay: 0.6, ease: "expo.out", stagger: 0.1 });

      const scroll = { trigger: container.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-scroll", { scale: 0.88, borderRadius: "2.5rem", yPercent: 8, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-badge-text", { rotate: 360, ease: "none", scrollTrigger: scroll });
    },
    { scope: container, dependencies: [introDone] },
  );

  return (
    <section
      ref={container}
      id="top"
      className="relative z-10 h-svh min-h-[560px] overflow-hidden bg-paper"
      style={{ visibility: introDone ? undefined : "hidden" }}
    >
      <div className="hero-scroll absolute inset-0 overflow-hidden">
        <div className="hero-stage absolute inset-0 bg-paper">
          <Backdrop contained />
          <HeroLayer />
        </div>

        <div aria-hidden className="hero-badge pointer-events-none absolute bottom-6 right-4 size-24 md:bottom-8 md:right-8 md:size-28">
          <svg viewBox="0 0 100 100" className="hero-badge-text size-full">
            <defs>
              <path id="badge-circle" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
            </defs>
            <g className="origin-center animate-[spin_16s_linear_infinite]">
              <text className="fill-ink text-[10px] font-semibold uppercase tracking-[0.25em]">
                <textPath href="#badge-circle" textLength="248" lengthAdjust="spacing">
                  Scroll · Scroll · Scroll · Scroll ·
                </textPath>
              </text>
            </g>
          </svg>
          <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-pop text-xl">↓</span>
        </div>
      </div>
    </section>
  );
}
