"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Photo from "@/components/Photo";
import { photos } from "@/content/site";

// Two offset images that fade up calmly one after the other.
export default function ImagePair() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".pair-item").forEach((el) => {
        const scroll = { trigger: el, start: "top 85%", once: true };
        gsap.from(el, { autoAlpha: 0, y: 50, duration: 1.4, ease: "expo.out", scrollTrigger: scroll });
        gsap.from(el.querySelector(".photo-inner"), { scale: 1.12, duration: 2, ease: "expo.out", scrollTrigger: scroll });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="grid grid-cols-12 gap-4 px-4 pb-40 md:px-8">
      <div className="pair-item col-span-10 md:col-span-5">
        <Photo src={photos[1]?.src} alt={photos[1]?.alt ?? ""} sizes="(min-width: 768px) 40vw, 80vw" className="aspect-[3/4]" />
      </div>
      <div className="pair-item col-span-10 col-start-3 mt-10 md:col-span-6 md:col-start-7 md:mt-[24vh]">
        <Photo src={photos[2]?.src} alt={photos[2]?.alt ?? ""} sizes="(min-width: 768px) 50vw, 80vw" className="aspect-[4/3]" />
      </div>
    </section>
  );
}
