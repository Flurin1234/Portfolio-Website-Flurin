"use client";

import { useLenis } from "lenis/react";
import Glow from "@/components/Glow";
import RollingText from "@/components/RollingText";
import { site } from "@/content/site";

export default function Footer() {
  const lenis = useLenis();

  return (
    <footer id="kontakt" className="relative isolate overflow-hidden rounded-t-[2rem] bg-ink px-4 pb-6 pt-28 text-cream md:px-8">
      <Glow color="blue" strength={0.35} className="-bottom-[40vh] -left-[15vw] size-[80vw]" />
      <Glow color="taupe" strength={0.3} className="-right-[20vw] -top-[30vh] size-[60vw]" />

      <a href={`mailto:${site.email}`} className="group block w-fit text-[clamp(3.5rem,10vw,10rem)] font-medium leading-[0.9] tracking-tighter">
        Let&apos;s{" "}
        <span className="font-serif font-normal italic text-blue transition-colors duration-500 group-hover:text-taupe">talk</span>
      </a>

      <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <a href={`mailto:${site.email}`} className="group/roll flex items-center gap-1">
          <span className="flex h-11 items-center rounded-full border border-cream/30 px-5 text-lg transition-colors group-hover/roll:border-blue group-hover/roll:bg-blue group-hover/roll:text-paper">
            <RollingText text={site.email} />
          </span>
          <span className="flex size-11 items-center justify-center rounded-full border border-cream/30 transition-[background-color,border-color,rotate] duration-500 group-hover/roll:-rotate-45 group-hover/roll:border-blue group-hover/roll:bg-blue">
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
                className="group/roll flex h-11 items-center rounded-full border border-cream/30 px-5 text-sm uppercase transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                <RollingText text={s.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-24 flex items-center justify-between text-sm text-cream/50">
        <span>
          © {site.firstName} {site.lastName}
        </span>
        <button type="button" onClick={() => lenis?.scrollTo(0, { duration: 2 })} className="group/roll hover:text-cream">
          <RollingText text="Nach oben ↑" />
        </button>
      </div>
    </footer>
  );
}
