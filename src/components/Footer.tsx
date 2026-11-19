"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import RollingText from "@/components/RollingText";
import { useDarkTheme } from "@/components/ThemeSection";
import { site } from "@/content/site";

export default function Footer() {
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  useDarkTheme(ref, "top 80%");

  return (
    <footer ref={ref} id="kontakt" className="relative px-4 pb-6 pt-28 text-ink md:px-8">
      <a href={`mailto:${site.email}`} className="group block w-fit text-[clamp(3.5rem,10vw,10rem)] font-medium leading-[0.9] tracking-tighter">
        Let&apos;s{" "}
        <span className="font-serif font-normal italic text-pop transition-colors duration-500 group-hover:text-blue">talk</span>
      </a>

      <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <a href={`mailto:${site.email}`} className="group/roll flex items-center gap-1">
          <span className="flex h-11 items-center rounded-full border border-ink/30 px-5 text-lg transition-colors group-hover/roll:border-pop group-hover/roll:bg-pop group-hover/roll:text-[#0d0d12]">
            <RollingText text={site.email} />
          </span>
          <span className="flex size-11 items-center justify-center rounded-full border border-ink/30 transition-[background-color,border-color,rotate] duration-500 group-hover/roll:-rotate-45 group-hover/roll:border-pop group-hover/roll:bg-pop group-hover/roll:text-[#0d0d12]">
            →
          </span>
        </a>
        <ul className="flex gap-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/roll flex h-11 items-center rounded-full border border-ink/25 px-5 text-sm uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <RollingText text={s.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-24 flex items-center justify-between text-sm text-ink/50">
        <span>
          © {site.firstName} {site.lastName}
        </span>
        <button type="button" onClick={() => lenis?.scrollTo(0, { duration: 2 })} className="group/roll hover:text-ink">
          <RollingText text="Nach oben ↑" />
        </button>
      </div>
    </footer>
  );
}
