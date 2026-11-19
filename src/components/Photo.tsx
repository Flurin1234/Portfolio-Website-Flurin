import Image from "next/image";

type PhotoProps = {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  tint?: number;
  skew?: boolean;
  className?: string;
};

const tints = [
  "from-cream via-[#d8d5ce] to-taupe/45",
  "from-cream via-[#e3d6cf] to-pop/30",
  "from-cream via-[#d6d9e2] to-blue/30",
  "from-[#d9d7d1] via-[#cfccc5] to-ink/20",
];

// Editorial image slot; until a real photo is set it shows a soft tinted surface. `skew` lets it lean with scroll speed.
export default function Photo({ src, alt, sizes = "100vw", priority = false, tint = 0, skew = false, className = "" }: PhotoProps) {
  return (
    <div className={`photo relative overflow-hidden bg-cream ${skew ? "skew-on-scroll" : ""} ${className}`}>
      <div className="photo-inner absolute inset-0">
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${tints[tint % tints.length]}`} />
        )}
      </div>
    </div>
  );
}
