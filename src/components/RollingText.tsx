// Text that rolls up to a duplicate on hover of the nearest `group/roll` ancestor.
export default function RollingText({ text }: { text: string }) {
  const chars = [...text];
  const renderChars = (hidden: boolean) =>
    chars.map((c, i) => (
      <span
        key={i}
        className={`inline-block transition-transform duration-500 ease-expo ${
          hidden ? "translate-y-full group-hover/roll:translate-y-0" : "group-hover/roll:-translate-y-full"
        }`}
        style={{ transitionDelay: `${i * 18}ms` }}
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {renderChars(false)}
      </span>
      <span aria-hidden className="absolute inset-0 inline-flex">
        {renderChars(true)}
      </span>
    </span>
  );
}
