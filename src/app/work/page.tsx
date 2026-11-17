import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import Skills from "@/components/sections/Skills";
import { company } from "@/content/site";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <PageShell>
      <PageHeader title="Work" intro={`Die Teams, in denen ich bei ${company} gearbeitet habe — und was ich dort gemacht habe.`} />
      <section className="px-4 py-16 md:px-8">
        <SectionHeading title="Meine Stationen" />
        <Timeline />
      </section>
      <Skills />
    </PageShell>
  );
}
