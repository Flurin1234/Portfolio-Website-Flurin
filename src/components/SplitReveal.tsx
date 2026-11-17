"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/components/IntroProvider";

type SplitRevealProps = {
  children: React.ReactNode;
  className?: string;
  type?: "lines" | "chars";
};

// Masked line/char reveal when the element scrolls into view.
export default function SplitReveal({ children, className, type = "lines" }: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const introDone = useIntroDone();

  useGSAP(
    () => {
      if (!introDone) return;
      // Split the wrapped element itself so headings stay a single element
      const target = ref.current!.firstElementChild ?? ref.current;
      SplitText.create(target, {
        type,
        mask: type,
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(type === "lines" ? self.lines : self.chars, {
            yPercent: 110,
            duration: 1.2,
            ease: "expo.out",
            stagger: type === "lines" ? 0.1 : 0.03,
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          }),
      });
    },
    { scope: ref, dependencies: [introDone] },
  );

  return (
    <div ref={ref} className={className} style={{ visibility: introDone ? undefined : "hidden" }}>
      {children}
    </div>
  );
}
