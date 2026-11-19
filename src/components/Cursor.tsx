"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// Small orange dot as cursor, plus a label bubble over elements with a `data-cursor` label.
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const node = el.current!;
    const xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" });
    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
      dot.current!.style.opacity = "1";
    };
    const onLeave = () => (dot.current!.style.opacity = "0");
    const onOver = (e: PointerEvent) => {
      const labelled = (e.target as Element).closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[85] hidden size-2.5 -ml-[5px] -mt-[5px] rounded-full bg-pop opacity-0 transition-opacity pointer-fine:block"
      />
      <div ref={el} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] hidden pointer-fine:block">
      <div
        className={`flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-pop text-xs font-semibold text-ink shadow-[0_10px_40px_-10px_rgb(255_90_31/0.7)] transition-[scale,opacity] duration-500 ease-expo ${
          label ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {label}
        </div>
      </div>
    </>
  );
}
