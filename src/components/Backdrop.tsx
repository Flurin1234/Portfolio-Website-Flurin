"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/components/IntroProvider";

const blobs = [
  { rgb: "255 90 31", a: 0.32, cls: "left-[-15vw] top-[-10vh] size-[70vw] md:size-[55vw]", y: 70, x: 20 },
  { rgb: "88 135 255", a: 0.28, cls: "right-[-20vw] top-[30vh] size-[80vw] md:size-[60vw]", y: -60, x: -25 },
  { rgb: "180 139 125", a: 0.35, cls: "left-[20vw] bottom-[-30vh] size-[70vw] md:size-[50vw]", y: -40, x: 15 },
];

// Page-wide colour fields that drift slowly and shift with scroll; `contained` fills its parent instead of the viewport.
export default function Backdrop({ contained = false }: { contained?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const introDone = useIntroDone();

  useGSAP(
    () => {
      if (!introDone) return;
      const scroll = { start: 0, end: "max", scrub: 1.5 };

      gsap.from(".bd-mouse", { autoAlpha: 0, duration: 2, ease: "power2.out" });
      gsap.utils.toArray<HTMLElement>(".bd-blob").forEach((blob, i) => {
        gsap.to(blob, { yPercent: blobs[i].y, xPercent: blobs[i].x, scale: 1.25, ease: "none", scrollTrigger: scroll });
      });

      if (!window.matchMedia("(pointer: fine)").matches) return;
      const xTo = gsap.quickTo(".bd-mouse", "x", { duration: 2, ease: "power3.out" });
      const yTo = gsap.quickTo(".bd-mouse", "y", { duration: 2, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        xTo((e.clientX / window.innerWidth - 0.5) * -50);
        yTo((e.clientY / window.innerHeight - 0.5) * -50);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root, dependencies: [introDone] },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none inset-0 overflow-hidden ${contained ? "absolute" : "fixed -z-10"}`}
    >
      <div className="bd-mouse absolute -inset-[10%]">
        {blobs.map((b, i) => (
          <div key={b.rgb} className={`bd-blob absolute ${b.cls}`}>
            <div
              className="size-full animate-[drift_24s_ease-in-out_infinite_alternate] rounded-full"
              style={{
                background: `radial-gradient(closest-side, rgb(${b.rgb} / ${b.a}), transparent)`,
                animationDelay: `${i * -8}s`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
