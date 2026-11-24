"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Glow from "@/components/Glow";
import { useIntroDone } from "@/components/IntroProvider";
import { LangSwitch, useContent } from "@/components/LangProvider";
import Magnetic from "@/components/Magnetic";
import RollingText from "@/components/RollingText";
import { navLinks, site } from "@/content/site";

const ease = [0.76, 0, 0.24, 1] as const;

// Bottom edge of the menu panel: bulges while moving, flat when at rest
const curved = "M0 0 H100 Q50 200 0 0 Z";
const flat = "M0 0 H100 Q50 0 0 0 Z";

function Squiggle() {
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none absolute left-0 top-[48%] h-[0.28em] w-full -translate-y-1/2"
    >
      <motion.path
        d="M0 6 H30 C36 6 36 14 42 14 H58 C64 14 64 6 70 6 H100"
        fill="none"
        stroke="var(--color-pop)"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        variants={{ rest: { pathLength: 0 }, active: { pathLength: 1 } }}
        transition={{ duration: 0.6, ease }}
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].href);
  const introDone = useIntroDone();
  const { ui } = useContent();
  const lenis = useLenis(() => {
    // The last section whose top has passed the middle of the screen is the current one
    let current = navLinks[0].href;
    for (const link of navLinks) {
      const el = document.querySelector(link.href);
      if (el && el.getBoundingClientRect().top < window.innerHeight / 2) current = link.href;
    }
    setActive(current);
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    lenis?.start();
    setOpen(false);
  };

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    close();
    lenis?.scrollTo(href, { duration: 1.8 });
  };

  return (
    <>
      <motion.header
        style={{ viewTransitionName: "site-header" }}
        initial={{ y: "-130%" }}
        animate={{ y: introDone ? "0%" : "-130%" }}
        transition={{ duration: 0.8, ease }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-4 md:p-5"
      >
        <Magnetic className="pointer-events-auto">
          <a
            href={`mailto:${site.email}`}
            className="group/roll flex h-11 items-center gap-2 rounded-lg bg-pop px-4 font-display text-base text-[#0d0d12]"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <RollingText text={ui.contact} />
          </a>
        </Magnetic>

        <div className="pointer-events-auto flex items-center gap-2">
          <LangSwitch className="hidden sm:flex" />
          <Magnetic>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? ui.menuClose : ui.menuOpen}
            className={`relative flex size-11 items-center justify-center rounded-lg border transition-colors duration-300 ${
              open
                ? "border-pop bg-pop text-ink"
                : "border-ink/15 bg-paper/70 text-ink backdrop-blur hover:border-ink hover:bg-ink hover:text-paper"
            }`}
          >
            <motion.span
              className="absolute h-0.5 bg-current"
              initial={false}
              animate={open ? { rotate: 45, y: 0, width: 18 } : { rotate: 0, y: -3, width: 20 }}
              transition={{ duration: 0.5, ease }}
            />
            <motion.span
              className="absolute h-0.5 bg-current"
              initial={false}
              animate={open ? { rotate: -45, y: 0, x: 0, width: 18 } : { rotate: 0, y: 3, x: -4, width: 12 }}
              transition={{ duration: 0.5, ease }}
            />
          </button>
          </Magnetic>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            key="menu"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease, delay: 0.15 } }}
            transition={{ duration: 0.9, ease }}
            className="fixed inset-0 z-40"
          >
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute left-0 top-full h-[18vh] w-full fill-paper"
            >
              <motion.path
                initial={{ d: curved }}
                animate={{ d: flat }}
                exit={{ d: curved, transition: { duration: 0.8, ease, delay: 0.15 } }}
                transition={{ duration: 1, ease }}
              />
            </svg>

            <div className="isolate flex size-full flex-col items-center justify-center overflow-hidden bg-paper">
              <Glow color="pop" strength={0.12} className="-bottom-[35vh] -left-[20vw] size-[90vw]" />
              <Glow color="blue" strength={0.1} className="-right-[20vw] -top-[25vh] size-[70vw]" />

              <ul className="flex flex-col items-center">
                {navLinks.map((link, i) => {
                  const isActive = link.href === active;
                  return (
                    <li key={link.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%", rotate: 8 }}
                        animate={{ y: 0, rotate: 0 }}
                        exit={{ y: "-110%", rotate: -4, transition: { duration: 0.5, ease, delay: i * 0.04 } }}
                        transition={{ duration: 1, ease, delay: 0.35 + i * 0.08 }}
                        className="origin-bottom-left"
                      >
                        <motion.div initial="rest" animate={isActive ? "active" : "rest"} whileHover="active" className="relative">
                          <a
                            href={link.href}
                            onClick={(e) => goTo(e, link.href)}
                            className={`group/roll relative block font-display text-[clamp(3rem,min(9vw,13vh),7rem)] leading-none text-ink transition-colors duration-300 ${
                              isActive ? "text-ink/35" : "hover:text-ink/35"
                            }`}
                          >
                            <RollingText text={link.label} />
                            <Squiggle />
                          </a>
                        </motion.div>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.6 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute bottom-8 flex flex-col items-center gap-4"
              >
                <LangSwitch />
                <ul className="flex gap-2">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/roll flex h-10 items-center rounded-full border border-ink/15 px-4 text-sm text-ink transition-colors hover:border-pop hover:bg-pop hover:text-ink"
                      >
                        <RollingText text={s.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
