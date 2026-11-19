"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Photo from "@/components/Photo";
import { photos } from "@/content/site";

// A single framed image that fades up calmly when it comes into view.
export default function WideImage() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scroll = { trigger: ref.current, start: "top 80%", once: true };
      gsap.from(".photo", { autoAlpha: 0, y: 50, duration: 1.4, ease: "expo.out", scrollTrigger: scroll });
      gsap.from(".photo-inner", { scale: 1.12, duration: 2, ease: "expo.out", scrollTrigger: scroll });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="px-4 py-16 md:px-8">
      <Photo
        src={photos[0]?.src}
        alt={photos[0]?.alt ?? ""}
        sizes="(min-width: 768px) 60vw, 100vw"
        className="mx-auto aspect-[4/5] w-full md:aspect-[3/2] md:w-[60vw]"
      />
    </section>
  );
}
