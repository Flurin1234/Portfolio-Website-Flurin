"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Media from "@/components/Media";
import RollingText from "@/components/RollingText";
import { photos } from "@/content/site";

const links = [
  { label: "Work", href: "/work" },
  { label: "Off Work", href: "/off-work" },
];

// A photo grows from a small card to fullscreen while scrolling, then the page links appear on top.
export default function ZoomLinks() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: "top top", end: "bottom bottom", scrub: true },
      });
      tl.fromTo(
        ".zoom-frame",
        { width: "28vw", height: "36svh", borderRadius: "1.25rem" },
        { width: "100vw", height: "100svh", borderRadius: "0rem", ease: "power2.inOut", duration: 1 },
      )
        .fromTo(".zoom-frame .media-inner", { scale: 1.4 }, { scale: 1, ease: "none", duration: 1 }, 0)
        .from(".zoom-link", { yPercent: 120, autoAlpha: 0, stagger: 0.1, duration: 0.4, ease: "power3.out" }, 0.75);
    },
    { scope: container },
  );

  const photo = photos[photos.length - 1];

  return (
    <section ref={container} className="relative h-[260svh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div className="zoom-frame relative overflow-hidden" style={{ width: "28vw", height: "36svh", borderRadius: "1.25rem" }}>
          <Media src={photo?.src} alt={photo?.alt ?? ""} tone="sky" sizes="100vw" className="size-full rounded-none" />
        </div>

        <nav className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          {links.map((link) => (
            <div key={link.href} className="overflow-hidden p-2">
              <Link href={link.href} className="zoom-link group/roll flex items-stretch gap-1 font-display text-[10vw] leading-none text-ink md:text-[4.5vw]">
                <span className="flex items-center rounded-full bg-paper px-8 py-4 transition-colors duration-300 group-hover/roll:bg-blue group-hover/roll:text-paper">
                  <RollingText text={link.label} />
                </span>
                <span className="flex aspect-square items-center justify-center rounded-full bg-paper text-[0.6em] transition-[background-color,color,rotate] duration-500 group-hover/roll:-rotate-45 group-hover/roll:bg-blue group-hover/roll:text-paper">
                  →
                </span>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
