const glowColors = { pop: "255 90 31", blue: "88 135 255", taupe: "180 139 125" } as const;

// Soft colour blob; positioned to overlap neighbouring sections so they blend into each other.
export default function Glow({
  className,
  color,
  strength = 0.4,
}: {
  className: string;
  color: keyof typeof glowColors;
  strength?: number;
}) {
  const rgb = glowColors[color];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ background: `radial-gradient(closest-side, rgb(${rgb} / ${strength}), transparent)` }}
    />
  );
}
