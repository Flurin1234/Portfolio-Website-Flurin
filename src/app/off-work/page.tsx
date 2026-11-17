import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import HorizontalGallery from "@/components/HorizontalGallery";
import { hobbies } from "@/content/site";

export const metadata: Metadata = { title: "Off Work" };

export default function OffWorkPage() {
  return (
    <PageShell>
      <PageHeader title="Off Work" intro="Was ich mache, wenn ich nicht gerade arbeite." />
      <HorizontalGallery items={hobbies} />
    </PageShell>
  );
}
