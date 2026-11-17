"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// Cursor bubble that only appears over elements with a `data-cursor` label.
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const node = el.current!;
    const xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const labelled = (e.target as Element).closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <div ref={el} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] hidden pointer-fine:block">
      <div
        className={`flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue text-xs font-semibold text-paper shadow-[0_10px_40px_-10px_rgb(88_135_255/0.7)] transition-[scale,opacity] duration-500 ease-expo ${
          label ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
