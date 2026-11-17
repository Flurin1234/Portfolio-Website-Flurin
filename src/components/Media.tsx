import Image from "next/image";

const tones = {
  sky: "bg-sky",
  rose: "bg-rose",
  sage: "bg-sage",
  alice: "bg-cream",
} as const;

export const toneCycle = ["sky", "rose", "sage", "alice"] as const;

export type MediaProps = {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  tone?: keyof typeof tones;
  className?: string;
};

// Images are tinted in the pastel tone and turn full colour on hover of a `group/media` ancestor.
export default function Media({
  src,
  alt,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  tone = "sky",
  className = "",
}: MediaProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${tones[tone]} ${className}`}>
      <div className="media-inner absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover mix-blend-multiply grayscale transition-[filter] duration-700 group-hover/media:mix-blend-normal group-hover/media:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(255_255_255/0.35),transparent_55%)]" />
        )}
      </div>
    </div>
  );
}
