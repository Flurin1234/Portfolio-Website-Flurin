import SplitReveal from "@/components/SplitReveal";

export default function SectionHeading({ title }: { title: string }) {
  return (
    <SplitReveal className="mb-12">
      <h2 className="text-[clamp(1.875rem,3.6vw,3.25rem)] font-medium leading-[1] tracking-tighter">{title}</h2>
    </SplitReveal>
  );
}
